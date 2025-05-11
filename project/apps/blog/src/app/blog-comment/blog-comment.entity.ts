import {Entity} from '@project/core';
import {Comment} from '@project/types';
import {CreateCommentDto} from './dto/create-comment.dto';

export class BlogCommentEntity implements Comment, Entity<string, Comment> {
  public id?: string;
  public text: string;
  public author: string;
  public creationDate: Date;
  public postId: string

  public populate(data: Comment) {
    this.id = data.id ?? undefined;
    this.text = data.text;
    this.author = data.author;
    this.creationDate = data.creationDate ?? new Date();
    this.postId = data.postId

    return this
  }

  public toObject(): Comment {
    return {
      id: this.id,
      text: this.text,
      author: this.author,
      creationDate: this.creationDate,
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
        creationDate: new Date(),
      });
  }
}

