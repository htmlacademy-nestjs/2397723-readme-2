import {Entity} from '@project/core';
import {AuthUser} from '@project/types';
import {compare, genSalt, hash} from 'bcrypt';
import {SALT_ROUNDS} from './blog-user.constant';

export class BlogUserEntity implements AuthUser, Entity<string> {
  public id?: string;
  public email: string;
  public name: string;
  public avatar: string;
  public postCount: number;
  public subscriberCount: number;
  public passwordHash: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(user: AuthUser) {
    this.populate(user)
  }

  public populate(data: AuthUser) {
    this.email = data.email;
    this.name = data.name;
    this.avatar = data.avatar;
    this.postCount = data.postCount;
    this.subscriberCount = data.subscriberCount;
    this.passwordHash = data.passwordHash;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
  }

  public toObject() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      postCount: this.postCount,
      subscriberCount: this.subscriberCount,
      passwordHash: this.passwordHash,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  static fromObject(data: AuthUser): BlogUserEntity {
    return new BlogUserEntity(data);
  }
}
