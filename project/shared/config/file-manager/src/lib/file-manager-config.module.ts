import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import fileManagerConfig from './file-manager.config';

const ENV_FILE_PATH = 'apps/file-manager/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [fileManagerConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ]
})
export class FileManagerConfigModule {
}
