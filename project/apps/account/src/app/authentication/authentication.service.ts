import {
  ConflictException,
  HttpException, HttpStatus, Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {User} from '@project/types';
import {createJWTPayload} from '@project/helpers';
import {jwtConfig} from '@project/shared/config/account';
import {BlogUserRepository} from '../blog-user/blog-user.repository';
import {CreateUserDto} from './dto/create-user.dto';
import {BlogUserEntity} from '../blog-user/blog-user.entity';
import {LoginUserDto} from './dto/login-user.dto';
import {RefreshTokenService} from '../refresh-token/refresh-token.service';
import {AUTH} from './authentication.constant';
import {ChangePasswordDto} from './dto/change-passport.dto';
import {UpdateUserDto} from './dto/update-user.dto';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
  }

  public async register(dto: CreateUserDto) {
    const {email, name, avatar, password} = dto;

    const blogUser = {
      email,
      name,
      avatar,
      passwordHash: '',
    };

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH.USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser)
      .setPassword(password)

    return this.blogUserRepository
      .save(userEntity);
  }

  public async changePassword(dto: ChangePasswordDto) {
    const {userId, password, newPassword} = dto;

    const existUser = await this.blogUserRepository.findById(userId);

    if (!existUser) {
      throw new ConflictException(AUTH.USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH.USER_PASSWORD_WRONG);
    }

    const userEntity = await existUser
      .setPassword(newPassword);

    return this.blogUserRepository
      .update(userId, userEntity);
  }

  public async update(dto: UpdateUserDto) {
    const existUser = await this.blogUserRepository.findById(dto.userId);

    if (!existUser) {
      throw new ConflictException(AUTH.USER_NOT_FOUND);
    }

    const userEntity = new BlogUserEntity({...existUser.toObject(), ...dto});

    return this.blogUserRepository
      .update(dto.userId, userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);
    if (!existUser) {
      throw new NotFoundException(AUTH.USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH.USER_PASSWORD_WRONG);
    }
    return existUser;
  }

  public async getUser(id: string) {
    const existUser = await this.blogUserRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return existUser;
  }

  public async getManyUsers(ids: string[]) {
    return await this.blogUserRepository.findManyById(ids);
  }

  public async createUserToken(user: User) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {...accessTokenPayload, tokenId: crypto.randomUUID()};
    try {

      await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn,
      });

      return {accessToken, refreshToken};
    } catch (error) {
      this.logger.error(`[Token generation error]: ${error.message}`);

      throw new HttpException('Error with create token.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
