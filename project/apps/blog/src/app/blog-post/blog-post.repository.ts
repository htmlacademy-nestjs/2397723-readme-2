import {ConflictException, Injectable} from '@nestjs/common';
import {BlogPostEntity} from './blog-post.entity';
import {BasePostgresRepository} from '@project/core';
import {Post} from '@project/types';
import {PrismaClientService} from '@project/models';
import {RepostDto} from './dto/repost-dto';
import {PAGE_SIZE} from './blog-post.const';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity, Post> {

  constructor(
    protected readonly client: PrismaClientService
  ) {
    super(client, BlogPostEntity.fromObject);
  }

  public async findAll(): Promise<BlogPostEntity[]> {
    const posts = await this.client.post.findMany({
      include: {
        comments: true
      },
      take: PAGE_SIZE
    });
    return posts.map((post) => this.createEntityFromDocument(post))
  }

  public async save(entity: BlogPostEntity): Promise<BlogPostEntity> {
    const objEntity = entity.toObject();
    const record = await this.client.post.create({
      data: {
        ...objEntity,
        comments: {
          connect: []
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
        comments: true,
      }
    });

    return this.createEntityFromDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id
      }
    });
  }

  public async update(id: string, entity: BlogPostEntity): Promise<BlogPostEntity> {
    const objEntity = entity.toObject();
    const updatedPost = await this.client.post.update({
      where: {id},
      data: {
        tags: objEntity.tags,
        type: objEntity.type,
        likesCount: objEntity.likesCount,
        title: objEntity.title,
        youtubeLink: objEntity.youtubeLink,
        preview: objEntity.preview,
        textPostText: objEntity.textPostText,
        quotePostText: objEntity.quotePostText,
        quoteAuthor: objEntity.quoteAuthor,
        photo: objEntity.photo,
        link: objEntity.link,
        description: objEntity.description,
      },
      include: {
        comments: true,
      }
    });

    return this.createEntityFromDocument(updatedPost);
  }

  public async findByTitle(title: string): Promise<BlogPostEntity | null> {
    const document = await this.client.post.findFirst({
      where: {
        title,
      },
      include: {
        comments: true,
      }
    });
    return this.createEntityFromDocument(document);
  }

  public async createRepost(id: string, dto: RepostDto) {
    const repostedPost = await this.client.post.findFirst({
      where: {
        id
      },
      include: {
        comments: true,
      }
    });
    const posts = await this.client.post.findMany({include: {comments: true}});
    const usersEntities = posts.filter((post) => post.authorId = dto.userId);
    const exam = usersEntities.find((post) => post.originalPostId === repostedPost.id);
    if (exam) {
      throw new ConflictException(`Repost is already exist`);
    }

    const document = this.createEntityFromDocument(repostedPost);
    const repost = {
      ...document,
      id: undefined,
      authorId: dto.userId,
      originalAuthorId: repostedPost.authorId,
      originalPostId: repostedPost.id,
      commentsCount: 0,
      likesCount: 0
    }
    return this.client.post.create({
      data: {
        ...repost,
        comments: {}
      }
    })
  }
}
