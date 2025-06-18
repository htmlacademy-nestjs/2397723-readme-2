import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {Inject, Injectable} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';
import {RabbitRoutingEnum} from '@project/types';
import {rabbitConfig} from '@project/shared/config/account';
import {CreateSubscriberDto} from './dto/create-subscriber.dto';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>,
    private readonly rabbitClient: AmqpConnection,
  ) {
  }

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish<CreateSubscriberDto>(
      this.rabbitOptions.exchange,
      RabbitRoutingEnum.AddSubscriber,
      {...dto},
    );
  }
}
