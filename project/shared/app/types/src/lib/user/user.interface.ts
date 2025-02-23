export interface User {
  id?: string;
  email: string;
  name: string;
  avatar: string;
  registrationDate: Date;
  postCount: number;
  subscriberCount: number;
}
