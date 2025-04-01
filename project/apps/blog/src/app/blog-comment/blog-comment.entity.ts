import {Entity} from '@project/core';
import {Comment} from '@project/types';

export class BlogCommentEntity implements Comment, Entity<string> {
  public id: string;
  public text: string;
  public author: string;
  public creationDate: Date;
}
