import {PostType} from '@project/types';
import {Expose} from 'class-transformer';

export class CreatePostRdo {
  @Expose()
  public type: PostType;

  @Expose()
  public title?: string;

  @Expose()
  public youtubeLink?: string;

  @Expose()
  public preview?: string;

  @Expose()
  public textPostText?: string;

  @Expose()
  public quotePostText?: string;

  @Expose()
  public quoteAuthor?: string;

  @Expose()
  public photo?: string;

  @Expose()
  public link?: string;

  @Expose()
  public description?: string;

  @Expose()
  public tags?: string;

  @Expose()
  public creationDate: Date;
}
