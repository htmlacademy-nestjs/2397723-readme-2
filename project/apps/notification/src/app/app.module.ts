import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {getMongooseOptions, NotificationConfigModule} from '@project/notification';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotificationConfigModule,
    EmailSubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
