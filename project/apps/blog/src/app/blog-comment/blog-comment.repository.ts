import {Injectable, NotFoundException} from '@nestjs/common';
import {BasePostgresRepository} from '@project/core';
import {Comment, Pagination} from '@project/types';
import {PrismaClientService} from '@project/models';
import {BlogCommentEntity} from './blog-comment.entity';
import {BlogCommentQuery} from './query/blog-comment.query';

@Injectable()
export class BlogCommentRepository extends BasePostgresRepository<BlogCommentEntity, Comment> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, BlogCommentEntity.fromObject);
  }

  public async save(entity: BlogCommentEntity): Promise<BlogCommentEntity> {
    const record = await this.client.comment.create({
      data: {
        text: entity.text,
        userId: entity.userId,
        postId: entity.postId,
      },
    });

    entity.id = record.id;
    return entity;
  }

  public async findById(id: string): Promise<BlogCommentEntity> {
    const record = await this.client.comment.findFirst({
      where: {
        id,
      },
    });

    if (!record) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(record)
  }

  public async findByPostId(postId: string, query?: BlogCommentQuery): Promise<Pagination<BlogCommentEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = Number(query?.limit);
    const [records, count] = await Promise.all([
      this.client.comment.findMany({
        where: {
          postId,
        },
        skip,
        take,
      }),
      this.client.comment.count({
        where: {
          postId,
        }
      }),
    ]);

    return {
      entities: records.map(record => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: Math.ceil(count / take),
      itemsPerPage: take,
      totalItems: count,
    }
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: {
        id,
      }
    });
  }
}
