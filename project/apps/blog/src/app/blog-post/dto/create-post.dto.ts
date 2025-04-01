import {PostType} from '@project/types';

export class CreatePostDto {

  public type: PostType;
  public title?: string;
  public youtubeLink?: string;
  public preview?: string;
  public textPostText?: string;
  public quotePostText?: string;
  public quoteAuthor?: string;
  public photo?: string;
  public link?: string;
  public description?: string;
  public tags?: string;
  public creationDate: Date;

}
