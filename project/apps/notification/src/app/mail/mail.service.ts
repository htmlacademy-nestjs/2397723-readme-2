import {MailerService} from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {Subscriber} from '@project/types';
import {NotificationConfig} from '@project/notification';
import { EMAIL_SUBJECT } from './mail.constant';

@Injectable()
export class MailService {
  constructor(
    private readonly mailService: MailerService,
  ) { }

  @Inject(NotificationConfig.KEY)
  private readonly notificationConfig: ConfigType<typeof NotificationConfig>

  public async sendNotificationNewSubscriber(subscriber: Subscriber) {
    await this.mailService.sendMail({
      from: this.notificationConfig.mail.from,
      to: subscriber.email,
      subject: EMAIL_SUBJECT.ADD_SUBSCRIBER,
      template: './add-subscriber',
      context: {
        user: `${subscriber.name}`,
        email: `${subscriber.email}`,
      },
    });
  }
}
