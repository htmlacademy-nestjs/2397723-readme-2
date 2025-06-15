import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigAccountModule, getMongooseOptions} from '@project/shared/config/account';
import {AuthenticationModule} from './authentication/authentication.module';
import {BlogUserModule} from './blog-user/blog-user.module';
import {NotificationModule} from './notification/notification.module';

@Module({
  imports: [
    AuthenticationModule,
    BlogUserModule,
    ConfigAccountModule,
    NotificationModule,
    MongooseModule.forRootAsync(getMongooseOptions())
  ],
  controllers: [],
  providers: [],
})

export class AppModule {
}
