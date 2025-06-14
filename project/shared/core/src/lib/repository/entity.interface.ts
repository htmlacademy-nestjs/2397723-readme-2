export type EntityIdType = string;

export interface Entity<T extends EntityIdType> {
  id?: T;
  toObject(): Record<string, unknown>;
}
