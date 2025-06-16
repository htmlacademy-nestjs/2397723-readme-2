import {IsString} from 'class-validator';

export class FindByTitleDto {
  @IsString()
  title: string
}
