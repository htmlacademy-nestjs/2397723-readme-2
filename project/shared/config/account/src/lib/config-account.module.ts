import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mongoConfig from './mongo.config';
import applicationConfig from './app.config';

const ENV_USERS_FILE_PATH = 'apps/account/account.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, mongoConfig],
      envFilePath: ENV_USERS_FILE_PATH
    }),
  ]
})
export class ConfigAccountModule {}
