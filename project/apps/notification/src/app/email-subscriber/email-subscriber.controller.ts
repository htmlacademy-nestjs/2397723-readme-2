import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import {RabbitRoutingEnum} from '@project/types';
import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { MailService } from '../mail/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) { }

  @RabbitSubscribe({
    exchange: 'readme.notification.income',
    routingKey: RabbitRoutingEnum.AddSubscriber,
    queue: 'readme.notification.income',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotificationNewSubscriber(subscriber);
  }
}
