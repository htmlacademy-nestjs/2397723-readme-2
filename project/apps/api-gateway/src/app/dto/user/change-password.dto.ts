import {IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Old user password',
    example: '123456'
  })
  @IsString()
  public password: string;

  @ApiProperty({
    description: 'New user password',
    example: '123456'
  })
  @IsString()
  public newPassword: string;
}
