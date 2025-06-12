import {IsMongoId, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {POST_FIELD_INFO} from '../blog-post.const';

export class UserIdDto {
  @ApiProperty({
    description: POST_FIELD_INFO.USER_ID,
    example: POST_FIELD_INFO.USER_ID_EXAMPLE,
  })
  @IsNotEmpty()
  @IsMongoId()
  public userId: string;
}
