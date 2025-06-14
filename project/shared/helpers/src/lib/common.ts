import {ClassTransformOptions, plainToInstance} from 'class-transformer';

type PlainObject = Record<string, unknown>;

type MongoConfigString = {
  username: string;
  password: string;
  host: string;
  port: string;
  databaseName: string;
  authDatabase: string;
}

export function fillDto<T, V extends PlainObject>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T;

export function fillDto<T, V extends PlainObject[]>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T[];

export function fillDto<T, V extends PlainObject>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
    excludeExtraneousValues: true,
    ...options,
  });
}

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}: MongoConfigString): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}
