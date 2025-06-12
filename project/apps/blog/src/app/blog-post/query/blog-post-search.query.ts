import {IsOptional, IsString} from 'class-validator';

export class BlogPostSearchQuery {
  @IsString()
  @IsOptional()
  public substring = '';
}
