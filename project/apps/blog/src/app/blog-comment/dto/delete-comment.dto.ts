import {IsMongoId, IsNotEmpty, IsString} from 'class-validator';

export class DeleteCommentDto {
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  public author: string;
}
