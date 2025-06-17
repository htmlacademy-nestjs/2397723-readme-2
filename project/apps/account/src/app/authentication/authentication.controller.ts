import {Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {MongoIdValidationPipe} from '@project/core';
import {fillDto} from '@project/helpers';
import {RequestWithTokenPayload} from '@project/types';
import {ApiResponse, ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {AuthenticationService} from './authentication.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UserRdo} from './rdo/user.rdo';
import {LoginUserDto} from './dto/login-user.dto';
import {LoggedUserRdo} from './rdo/logged-user.rdo';
import {JwtAuthGuard} from './guards/jwt-auth.guard';
import {AUTH} from './authentication.constant';
import {LocalAuthGuard} from './guards/local-auth.guard';
import {BlogUserEntity} from '../blog-user/blog-user.entity';
import {UpdateUserDto} from './dto/update-user.dto';
import {ChangePasswordDto} from './dto/change-passport.dto';
import {UsersInfoDto} from './dto/users-data.dto';
import {JwtRefreshGuard} from './guards/jwt-refresh.guard';
import {NotificationService} from '../notification/notification.service';

interface RequestWithUser {
  user?: BlogUserEntity,
}

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notificationService: NotificationService,
  ) {
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AUTH.CREATED,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AUTH.USER_EXISTS,
  })
  @Post('register')
  public async create(
    @Body()
      dto: CreateUserDto,
  ) {
    const newUser = await this.authService.register(dto);
    const { email, name } = newUser;

    await this.notificationService.registerSubscriber({ email, name });

    return fillDto(UserRdo, newUser.toObject());
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AUTH.LOGGED,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AUTH.USER_PASSWORD_OR_EMAIL_WRONG,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Body()
      body: LoginUserDto,
    @Req()
      {user}: RequestWithUser
  ) {
    const userToken = await this.authService.createUserToken(user);

    return fillDto(LoggedUserRdo, {...user.toObject(), ...userToken});
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update user info.',
  })
  @Patch('update')
  public async update(
    @Body()
      dto: UpdateUserDto,
  ) {
    const updatedUser = await this.authService.update(dto);

    return fillDto(UserRdo, updatedUser.toObject());
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('password')
  public async password(
    @Body()
      dto: ChangePasswordDto,
  ) {
    const user = await this.authService.changePassword(dto);

    return fillDto(UserRdo, user.toObject());
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: AUTH.GET,
  })
  @HttpCode(HttpStatus.OK)
  @Post('info')
  public async info(
    @Body()
      dto: UsersInfoDto,
  ) {
    const users = await this.authService.getManyUsers(dto.ids);

    const result = {};
    users.forEach((item: BlogUserEntity) => {
      result[item.id] = fillDto(UserRdo, item.toObject());
    })

    return result;
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: AUTH.GET,
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(
    @Param('id', MongoIdValidationPipe)
      id: string,
  ) {
    const existUser = await this.authService.getUser(id);

    return fillDto(UserRdo, existUser.toObject());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: AUTH.TOKEN,
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  public async refreshToken(
    @Req()
      {user}: RequestWithUser,
  ) {
    return this.authService.createUserToken(user);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AUTH.CHECK_TOKEN,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AUTH.UNAUTHORIZED,
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(
    @Req()
      {user: payload}: RequestWithTokenPayload,
  ) {
    return payload;
  }
}
