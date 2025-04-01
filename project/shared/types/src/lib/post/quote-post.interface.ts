import {Post} from './post.interface';
/*TODO delete*/
export interface QuotePost extends Post {
  text: string;
  quoteAuthor: string;
}
