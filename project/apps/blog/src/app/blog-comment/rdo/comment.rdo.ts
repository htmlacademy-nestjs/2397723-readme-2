import { Expose } from 'class-transformer';

export class CommentRdo {
  @Expose()
  public postId: string;

  @Expose()
  public text: string;

  @Expose()
  public author: string;

  @Expose()
  public creationDate: Date;
}
