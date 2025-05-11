import {PostType} from '@project/types';
import {IsDate, IsNotEmpty, IsString} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  public authorId: string;

  @IsNotEmpty()
  public type: PostType;

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

  @IsString()
  public tags?: string;

  @IsString()
  @IsDate()
  public creationDate: Date;
}
