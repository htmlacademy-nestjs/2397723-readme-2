import {ArrayMaxSize, IsArray, IsString, Length} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({
    description: 'Tags names list',
    example: '[ help, old ]'
  })
  @IsArray()
  @ArrayMaxSize(8, {
    message: 'Max count of tags must be less then 8',
  })
  @IsString({each: true})
  @Length(3, 10, {
    message: 'Length of tag must be from 3 to 10 symbols',
  })
  public titles: string[];
}
