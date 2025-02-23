import {Post} from './post.interface';

export interface RepostedPost extends Post {
  originalAuthorId: string;
  originalPostId: string;
}
