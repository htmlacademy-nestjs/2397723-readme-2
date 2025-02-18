import {Entity} from '@project/core';
import {AuthUser} from '@project/types';

export class BlogUserEntity implements AuthUser, Entity<string> {
  public id?: string;
  public email: string;
  public name: string;
  public avatar: string
  public registrationDate: Date;
  public postCount: number;
  public subscriberCount: number;
  public passwordHash: string;

  constructor(user: AuthUser) {
    this.populate(user)
  }

  public populate(data: AuthUser) {
    this.email = data.email;
    this.name = data.name;
    this.avatar = data.avatar;
    this.registrationDate = data.registrationDate;
    this.postCount = data.postCount;
    this.subscriberCount = data.subscriberCount;
  }

  public toObject() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      registrationDate: this.registrationDate,
      postCount: this.postCount,
      subscriberCount: this.subscriberCount,
      passwordHash: this.passwordHash,
    }
  }
}
