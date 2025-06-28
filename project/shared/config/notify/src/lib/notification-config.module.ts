import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import notificationConfig from './notification.config';

const ENV_FILE_PATH = 'apps/notification/notification.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [notificationConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ]
})
export class NotificationConfigModule {
}
