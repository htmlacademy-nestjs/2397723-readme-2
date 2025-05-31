import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class CreateUserDto {

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
    description: 'User name',
    example: 'Seriojo',
  })
  public name: string;

  @IsString()
  @ApiProperty({
    description: 'Link to user avatar',
    example: 'http://www.bestavatar.com/sdkfjh34kj4hrkfhwhfwh84h',
  })
  public avatar: string;

  @IsString()
  @ApiProperty({
    description: 'User password',
    example: 'Srt0ngestPASS!nTHew0rlD!',
  })
  public password: string;
}
