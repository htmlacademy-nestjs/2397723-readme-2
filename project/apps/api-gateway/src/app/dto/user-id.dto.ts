import {IsMongoId, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class UserIdDto {
  @ApiProperty({
    description: 'Mongo UUID for user id',
    example: '6580462f5e238357ab17003a',
  })
  @IsString()
  @IsMongoId()
  public userId: string;
}
