import {Post} from './post.interface';

export interface RepostedPost extends Post {
  originalPost: string;
}
