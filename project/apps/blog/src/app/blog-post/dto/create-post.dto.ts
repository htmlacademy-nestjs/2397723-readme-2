import {PostType} from '@project/types';
import {IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  public authorId: string;

  @IsString()
  @IsNotEmpty()
  public type: PostType;

  @IsString()
  @IsOptional()
  public title?: string;

  @IsString()
  @IsOptional()
  public youtubeLink?: string;

  @IsString()
  @IsOptional()
  public preview?: string;

  @IsString()
  @IsOptional()
  public textPostText?: string;

  @IsString()
  @IsOptional()
  public quotePostText?: string;

  @IsString()
  @IsOptional()
  public quoteAuthor?: string;

  @IsString()
  @IsOptional()
  public photo?: string;

  @IsString()
  @IsOptional()
  public link?: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsString()
  @IsOptional()
  public tags?: string;
}
