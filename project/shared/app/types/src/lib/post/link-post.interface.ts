import {Post} from './post.interface';
/*TODO delete*/
export interface LinkPost extends Post {
  link: string;
  title?: string;
}
