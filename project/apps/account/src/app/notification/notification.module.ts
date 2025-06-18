import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';
import {Module} from '@nestjs/common';
import {getRabbitMQOptions} from '@project/helpers';
import {NotificationService} from './notification.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit'),
    )
  ],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {
}
