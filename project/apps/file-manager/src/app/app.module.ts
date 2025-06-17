import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {FileUploaderModule} from './uploader/uploader.module';
import {FileManagerConfigModule, getMongooseOptions} from '@project/shared/config/file-manager';

@Module({
  imports: [
    FileUploaderModule,
    FileManagerConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
