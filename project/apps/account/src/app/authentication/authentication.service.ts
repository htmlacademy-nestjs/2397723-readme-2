import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import dayjs from 'dayjs';
import {BlogUserRepository} from '../blog-user/blog-user.repository';
import {CreateUserDto} from './dto/create-user.dto';
import {BlogUserEntity} from '../blog-user/blog-user.entity';
import {LoginUserDto} from './dto/login-user.dto';
import {AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG} from './authentication.constant';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
  ) {
  }

  public async register(dto: CreateUserDto) {
    const {email, name, avatar, registrationDate, password} = dto;

    const blogUser = {
      email,
      name,
      avatar,
      registrationDate: dayjs(registrationDate).toDate(),
      postCount: 0,
      subscriberCount: 0,
      passwordHash: '',
    };

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser)
      .setPassword(password)

    return this.blogUserRepository
      .save(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);
    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
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
}
