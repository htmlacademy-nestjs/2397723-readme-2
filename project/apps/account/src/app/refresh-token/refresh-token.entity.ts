import {Token} from '@project/types';
import {Entity} from '@project/core';

export class RefreshTokenEntity implements Entity<string>, Token {
  public id: string;
  public tokenId: string;
  public userId: string;
  public createdAt: Date;
  public expiresIn: Date;
  [key: string]: unknown;

  constructor(data: Token) {
    this.populate(data);
  }

  static fromObject(data: Token): RefreshTokenEntity {
    return new RefreshTokenEntity(data);
  }

  public toObject() {
    return {
      id: this.id,
      tokenId: this.tokenId,
      userId: this.userId,
      createdAt: this.createdAt,
      expiresIn: this.expiresIn,
    }
  }

  public populate(data: Token) {
    this.id = data.id ?? undefined;
    this.tokenId = data.tokenId;
    this.userId = data.userId;
    this.createdAt = data.createdAt;
    this.expiresIn = data.expiresIn;
  }
}
