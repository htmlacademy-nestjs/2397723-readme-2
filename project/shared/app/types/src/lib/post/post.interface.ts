import {PostType} from './post-type.enum';

export interface Post {
  id?: string;
  tags?: string;
  author: string;
  isPublished: boolean;
  publicationDate: Date;
  type: PostType;
  isReposted: boolean;
}
