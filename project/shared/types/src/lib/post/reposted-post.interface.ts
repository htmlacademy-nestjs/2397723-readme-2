import {Post} from './post.interface';
/*TODO delete*/
export interface RepostedPost extends Post {
  originalAuthorId: string;
  originalPostId: string;
}
