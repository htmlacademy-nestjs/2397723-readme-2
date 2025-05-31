import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class UserRdo {

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
    description: 'User name',
    example: 'Seriojo',
  })
  public name: string;

  @Expose()
  @ApiProperty({
    description: 'Link to user avatar',
    example: 'http://www.bestavatar.com/sdkfjh34kj4hrkfhwhfwh84h',
  })
  public avatar: string;

  @Expose()
  @ApiProperty({
    description: 'Count of users posts',
    example: '10',
  })
  public postCount: number;

  @Expose()
  @ApiProperty({
    description: 'Count of users subscrubers',
    example: '8',
  })
  public subscriberCount: number;

  @Expose()
  public updatedAt: string;

  @Expose()
  public createdAt: string;
}
