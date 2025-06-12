import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {Prisma} from '@prisma/client';
import {BasePostgresRepository} from '@project/core';
import {PrismaClientService} from '@project/models';
import {Pagination, Post, SortDirectionEnum, SortEnum} from '@project/types';
import {BlogPostEntity} from './blog-post.entity';
import {POST} from './blog-post.const';
import {BlogPostQuery} from './query/blog-post.query';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity, Post> {

  constructor(
    protected readonly client: PrismaClientService
  ) {
    super(client, BlogPostEntity.fromObject);
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({where});
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async find(query?: BlogPostQuery): Promise<Pagination<BlogPostEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = Number(query?.limit);
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    where.isPublished = true;

    if (query?.tags) {
      where.tags = {
        some: {
          id: {
            in: query.tags,
          }
        }
      }
    }

    if (query?.userId) {
      where.userId = query.userId;
    }

    const sortDirection = query?.sortDirection ?? SortDirectionEnum.desc;

    if (query?.sortType) {
      if (query.sortType === SortEnum.likes) {
        orderBy.likes = sortDirection;
      } else if (query.sortType === SortEnum.comments) {
        orderBy.comments = {
          _count: sortDirection,
        }
      } else {
        orderBy.createdAt = sortDirection;
      }
    } else {
      orderBy.createdAt = sortDirection
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          tags: true,
          comments: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map(record => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    }
  }

  public async save(entity: BlogPostEntity): Promise<BlogPostEntity> {
    const objEntity = entity.toObject();
    const record = await this.client.post.create({
      data: {
        ...objEntity,
        tags: {
          connect: objEntity.tags.map(({id}) => ({id})),
        },
        comments: {
          connect: objEntity.comments.map(({id}) => ({id})),
        }
      }
    });

    entity.id = record.id;
    return entity
  }

  public async findById(id: string): Promise<BlogPostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        tags: true,
        comments: true,
      }
    });

    if (!document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async search(str: string): Promise<BlogPostEntity[]> {
    const records = await this.client.post.findMany({
      where: {
        title: {
          contains: str,
          mode: 'insensitive',
        },
      },
      take: POST.SEARCH_LIMIT,
      include: {
        tags: true,
        comments: true,
      }
    });

    return records.map(record => this.createEntityFromDocument(record))
  }

  public async update(id: string, entity: BlogPostEntity): Promise<BlogPostEntity> {
    const objEntity = entity.toObject();
    const updatedPost = await this.client.post.update({
      where: {id},
      data: {
        title: objEntity.title,
        link: objEntity.link,
        preview: objEntity.preview,
        text: objEntity.text,
        author: objEntity.author,
        photo: objEntity.photo,
        description: objEntity.description,
        likes: objEntity.likes,
        isPublished: objEntity.isPublished,
        comments: {
          set: objEntity.comments.map(comment => ({id: comment.id})),
        },
        tags: {
          set: objEntity.tags.map(tag => ({id: tag.id})),
        },
      },
      include: {
        tags: true,
        comments: true,
      }
    });

    return this.createEntityFromDocument(updatedPost);
  }

  public async repost(id: string, userId: string): Promise<BlogPostEntity> {
    const repostedPost = await this.client.post.findFirst({
      where: {
        id
      },
      include: {
        tags: true,
        comments: true,
      }
    });
    if (!repostedPost) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    if (await this.client.post.findFirst({
      where: {
        userId,
        originalId: repostedPost.originalId,
      }
    })) {
      throw new ConflictException(`User should only one repost of a post`);
    }

    const record = await this.client.post.create({
      data: {
        ...repostedPost,
        originalId: repostedPost.originalId ?? repostedPost.id,
        originalUserId: repostedPost.userId,
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        userId,
        likes: [],
        isRepost: true,
        tags: {
          connect: repostedPost.tags.map(({id}) => ({id})),
        },
        comments: {
          connect: [],
        }
      },
      include: {
        tags: true,
        comments: true,
      }
    });

    return this.createEntityFromDocument(record);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      }
    });
  }
}
