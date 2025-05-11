export type EntityIdType = string;

export type DefaultObjectType = Record<string, unknown>;

export interface Entity<T extends EntityIdType, ObjectType = DefaultObjectType> {
  id?: T;
  toObject(): ObjectType;
}
