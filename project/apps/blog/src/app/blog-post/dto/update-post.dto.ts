import {Comment, PostType} from '@project/types';

export class UpdatePostDto {
  public id?: string;
  public authorId?: string;
  public tags?: string;
  public isPublished?: boolean;
  public publicationDate?: Date;
  public type?: PostType;
  public likesCount?: number;
  public comments?: Comment[];
  public commentsCount?: number;
  public isReposted?: boolean;
  public originalAuthorId?: string;
  public originalPostId?: string;
  public title?: string;
  public youtubeLink?: string;
  public preview?: string;
  public textPostText?: string;
  public quotePostText?: string;
  public quoteAuthor?: string;
  public photo?: string;
  public link?: string;
  public description?: string;
}
