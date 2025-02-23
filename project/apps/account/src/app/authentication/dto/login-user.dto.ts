import {ApiProperty} from '@nestjs/swagger';

export class LoginUserDto {

  @ApiProperty({
    description: 'User uniq email',
    example: 'email@example.com',
  })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: 'Srt0ngestPASS!nTHew0rlD!',
  })
  public password: string;
}
