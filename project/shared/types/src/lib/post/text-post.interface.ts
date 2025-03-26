import {Post} from './post.interface';
/*TODO delete*/
export interface TextPost extends Post {
  title: string;
  preview: string;
  text: string;
}
