import {Entity} from '@project/core';
import {Comment} from '@project/types';
import {Record} from 'prisma/prisma-client/runtime/library';

export class BlogCommentEntity implements Comment, Entity<string, Comment> {
  public id: string;
  public text: string;
  public author: string;
  public creationDate: Date;
  public postId: string

  constructor(comment: Comment) {
    this.populate(comment)
  }

  public populate(data: Comment) {
    this.id = data.id ?? undefined;
    this.text = data.text;
    this.author = data.author;
    this.creationDate = data.creationDate ?? new Date();
    this.postId = data.postId
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
    return new BlogCommentEntity(data)
  }
}

