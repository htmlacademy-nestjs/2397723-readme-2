import {IsEmail, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {API} from '../notification.constant';

export class CreateSubscriberDto {
  @ApiProperty({
    description: API.EMAIL,
    example: API.EMAIL_EXAMPLE,
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: API.NAME,
    example: API.NAME_EXAMPLE,
  })
  @IsString()
  public name: string;
}
