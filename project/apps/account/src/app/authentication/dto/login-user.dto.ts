import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class LoginUserDto {

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User uniq email',
    example: 'email@example.com',
  })
  public email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User password',
    example: 'Srt0ngestPASS!nTHew0rlD!',
  })
  public password: string;
}
