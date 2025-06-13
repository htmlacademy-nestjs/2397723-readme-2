import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';
import {API} from '../authentication.constant';

export class UserRdo {

  @Expose()
  @ApiProperty({
    description: API.USER_ID,
    example: API.USER_ID_EXAMPLE,
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: API.EMAIL,
    example: API.EMAIL_EXAMPLE,
  })
  public email: string;

  @Expose()
  @ApiProperty({
    description: API.NAME,
    example: API.NAME_EXAMPLE,
  })
  public name: string;

  @Expose()
  @ApiProperty({
    description: API.AVATAR,
    example: API.AVATAR_EXAMPLE,
  })
  public avatar: string;

  @Expose()
  public updatedAt: string;

  @Expose()
  public createdAt: string;
}
