import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {FileManagerConfigModule, getMongooseOptions} from '@project/shared/config/file-manager';
import {FileUploaderModule} from './uploader/uploader.module';

@Module({
  imports: [
    FileUploaderModule,
    FileManagerConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
