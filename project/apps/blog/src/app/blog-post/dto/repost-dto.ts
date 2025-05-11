import {IsString} from 'class-validator';

export class RepostDto {
  @IsString()
  public userId: string;
}
