import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({
    description: 'User uniq email',
    example: 'email@example.com',
  })
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Seriojo',
  })
  public name: string;

  @ApiProperty({
    description: 'Link to user avatar',
    example: 'http://www.bestavatar.com/sdkfjh34kj4hrkfhwhfwh84h',
  })
  public avatar: string;

  @ApiProperty({
    description: 'User registration date',
    example: '2025-03-01',
  })
  public registrationDate: Date;

  @ApiProperty({
    description: 'User password',
    example: 'Srt0ngestPASS!nTHew0rlD!',
  })
  public password: string;
}
