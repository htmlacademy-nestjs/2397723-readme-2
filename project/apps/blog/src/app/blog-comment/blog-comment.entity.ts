import {Entity} from '@project/core';
import {Comment} from '@project/types';
import {Record} from 'prisma/prisma-client/runtime/library';

export class BlogCommentEntity implements Comment, Entity<string> {
  public id: string;
  public text: string;
  public author: string;
  public creationDate: Date;

  public toObject(): Record<string, unknown> {
    return {}
  }
}

