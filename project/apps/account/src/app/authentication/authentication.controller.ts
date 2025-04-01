import {Body, Controller, Get, HttpStatus, Param, Post} from '@nestjs/common';
import {AuthenticationService} from './authentication.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UserRdo} from './rdo/user.rdo';
import {fillDto} from '@project/helpers';
import {LoginUserDto} from './dto/login-user.dto';
import {LoggedUserRdo} from './rdo/logged-user.rdo';
import {ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New user has been created successfully.',
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillDto(UserRdo, newUser.toObject())
  }

  @ApiResponse({
    type: LoginUserDto,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return fillDto(LoggedUserRdo, verifiedUser.toObject());
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);
    return fillDto(UserRdo, existUser.toObject());
  }
}
