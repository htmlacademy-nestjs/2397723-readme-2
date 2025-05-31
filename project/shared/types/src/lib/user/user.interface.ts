export interface User {
  id?: string;
  email: string;
  name: string;
  avatar: string;
  postCount: number;
  subscriberCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}
