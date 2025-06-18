import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class SearchPostsDto {
  @ApiProperty({
    description: 'Search posts by substring in title',
    example: 'Post name',
  })
  @IsString()
  @IsNotEmpty()
  public substring: string;
}
