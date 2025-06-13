import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';
import {API} from '../authentication.constant';

export class LoggedUserRdo {

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
    description: API.TOKEN,
    example: API.TOKEN_EXAMPLE,
  })
  public accessToken: string;

  @ApiProperty({
    description: API.TOKEN,
    example: API.TOKEN_EXAMPLE
  })
  @Expose()
  public refreshToken: string;
}
