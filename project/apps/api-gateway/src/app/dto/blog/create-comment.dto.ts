import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Some text as comment for publication',
    example: 'This is cool story',
  })
  @IsString()
  @IsNotEmpty()
  public message: string;
}
