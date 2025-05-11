import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  public text: string;

  @IsString()
  @IsMongoId()
  public author: string;
}
