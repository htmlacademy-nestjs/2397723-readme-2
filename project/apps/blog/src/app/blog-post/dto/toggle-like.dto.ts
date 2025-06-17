import {IsMongoId, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {POST_FIELD_INFO} from '../blog-post.const';

export class ToggleLikeDto {
  @ApiProperty({
    description: POST_FIELD_INFO.LIKES,
    example: POST_FIELD_INFO.LIKES_EXAMPLE,
  })
  @IsNotEmpty()
  @IsMongoId()
  public likeId: string;
}
