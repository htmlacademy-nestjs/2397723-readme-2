import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class LoggedUserRdo {

  @Expose()
  @ApiProperty({
    description: 'User uniq ID',
    example: '13ddH1gt5R',
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'User email',
    example: 'email@example.com',
  })
  public email: string;

  @Expose()
  @ApiProperty({
    description: 'Access token',
    example: 'kJHGFDD78Kgf748GGKkufg7hilksvH',
  })
  public accessToken: string;
}
