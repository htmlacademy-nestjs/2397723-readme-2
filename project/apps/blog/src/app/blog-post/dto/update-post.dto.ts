import {Comment, PostType} from '@project/types';
import {IsBoolean, IsDate, IsNumber, IsString} from 'class-validator';

export class UpdatePostDto {
  @IsString()
  public authorId?: string;

  @IsString()
  public tags?: string;

  @IsBoolean()
  public isPublished?: boolean;

  @IsDate()
  public publicationDate?: Date;

  @IsString()
  public type?: PostType;

  @IsNumber()
  public likesCount?: number;

  public comments?: Comment[];

  @IsNumber()
  public commentsCount?: number;

  @IsBoolean()
  public isReposted?: boolean;

  @IsString()
  public originalAuthorId?: string;

  @IsString()
  public originalPostId?: string;

  @IsString()
  public title?: string;

  @IsString()
  public youtubeLink?: string;

  @IsString()
  public preview?: string;

  @IsString()
  public textPostText?: string;

  @IsString()
  public quotePostText?: string;

  @IsString()
  public quoteAuthor?: string;

  @IsString()
  public photo?: string;

  @IsString()
  public link?: string;

  @IsString()
  public description?: string;
}
