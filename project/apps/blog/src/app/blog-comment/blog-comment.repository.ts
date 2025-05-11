import {Injectable, NotFoundException} from '@nestjs/common';
import {BasePostgresRepository} from '@project/core';
import {BlogCommentEntity} from './blog-comment.entity';
import {Comment} from '@project/types';
import {PrismaClientService} from '@project/models';
import {MAX_COMMENTS_COUNT} from './blog-comment.constant';
import {DeleteCommentDto} from './dto/delete-comment.dto';

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
        author: entity.author,
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
      take: MAX_COMMENTS_COUNT,
    });

    if (!record) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(record)
  }

  public async findByPostId(postId: string): Promise<BlogCommentEntity[]> {
    const records = await this.client.comment.findMany({
      where: {
        postId
      }
    });

    return records.map(record => this.createEntityFromDocument(record))
  }

  public async deleteComment(id: string, dto: DeleteCommentDto): Promise<void> {
    const comment = await this.client.comment.findFirst({
      where: {
        id,
        author: dto.author,
      },
    })

    if (comment) {
      await this.client.comment.delete({
        where: {
          id
        }
      })
    }
  }
}
