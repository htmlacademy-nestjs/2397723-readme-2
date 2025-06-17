import {TokenPayload, User} from '@project/types';

export function createJWTPayload(user: User): TokenPayload {
  return <TokenPayload>{
    sub: user.id,
    email: user.email,
    name: user.name,
  };
}
