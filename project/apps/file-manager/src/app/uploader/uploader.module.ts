import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UploaderService } from './uploader.service';
import { UploaderController } from './uploader.controller';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema, UploaderModel } from './uploader.model';
import { UploaderRepository } from './uploader.repository';

const SERVE_ROOT = '/static';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>('application.uploadDirectory');

        return [{
          rootPath,
          serveRoot: SERVE_ROOT,
          serveStaticOptions: {
            fallthrough: true,
            etag: true,
          }
        }]
      }
    }),
    MongooseModule.forFeature([
      {
        name: UploaderModel.name,
        schema: FileSchema,
      }
    ])
  ],
  providers: [UploaderService, UploaderRepository],
  controllers: [UploaderController],
})
export class FileUploaderModule { }
