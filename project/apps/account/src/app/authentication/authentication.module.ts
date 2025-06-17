import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';
import {getJwtOptions} from '@project/shared/config/account';
import {AuthenticationController} from './authentication.controller';
import {AuthenticationService} from './authentication.service';
import {BlogUserModule} from '../blog-user/blog-user.module';
import {JwtAccessStrategy} from './strategies/jwt-access.strategy';
import {RefreshTokenModule} from '../refresh-token/refresh-token.module';
import {JwtRefreshStrategy} from './strategies/jwt-refresh.strategy';
import {LocalAccessStrategy} from './strategies/local-access.strategy';
import {NotificationModule} from '../notification/notification.module';

@Module({
  imports: [
    BlogUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
    RefreshTokenModule,
    NotificationModule
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    LocalAccessStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
  ],
})

export class AuthenticationModule {
}
