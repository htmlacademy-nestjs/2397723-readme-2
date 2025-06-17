import {Subscriber} from '@project/types';
import {Entity} from '@project/core';

export class EmailSubscriberEntity implements Subscriber, Entity<string, Subscriber> {
  public id?: string;
  public email: string;
  public name: string;

  static fromObject(data: Subscriber): EmailSubscriberEntity {
    return new EmailSubscriberEntity().populate(data);
  }

  public toObject() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
    }
  }

  public populate(data: Subscriber): EmailSubscriberEntity {
    this.id = data.id ?? undefined;
    this.email = data.email;
    this.name = data.name;

    return this;
  }
}
