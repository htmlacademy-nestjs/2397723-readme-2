import {Entity} from '@project/core';
import {Comment} from '@project/types';
import {CreateCommentDto} from './dto/create-comment.dto';

export class BlogCommentEntity implements Comment, Entity<string, Comment> {
  public id?: string;
  public text: string;
  public authorId: string;
  public createdAt: Date;
  public updatedAt: Date;
  public postId: string

  public populate(data: Comment): BlogCommentEntity {
    this.id = data.id ?? undefined;
    this.text = data.text;
    this.authorId = data.authorId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.postId = data.postId

    return this
  }

  public toObject(): Comment {
    return {
      id: this.id,
      text: this.text,
      authorId: this.authorId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      postId: this.postId,
    }
  }

  static fromObject(data: Comment): BlogCommentEntity {
    return new BlogCommentEntity().populate(data)
  }

  static fromDto(dto: CreateCommentDto, postId: string): BlogCommentEntity {
    return new BlogCommentEntity()
      .populate({
        ...dto,
        postId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  }
}

