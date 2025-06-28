import {IsOptional, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'New user name',
    example: 'Peter Kropotkin',
  })
  @IsOptional()
  @IsString()
  public name: string;

  @ApiProperty({
    description: 'Avatar path',
    example: '/usr/local/image.png',
  })
  @IsString()
  @IsOptional()
  public avatar: string;
}
