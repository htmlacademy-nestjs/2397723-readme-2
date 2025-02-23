import {PostType} from './post-type.enum';
import {Comment} from '../comment/comment.interface';

export interface Post {
  id?: string;
  authorId: string;

  tags?: string;
  isPublished: boolean;
  creationDate: Date;
  publicationDate: Date;
  type: PostType;
  likesCount: number;
  comments?: Comment[];
  commentsCount: number;
  isReposted: boolean;
  originalAuthorId?: string | null;
  originalPostId?: string | null;

  /*video&text*/
  title?: string | null;
  /*video*/
  youtubeLink?: string | null;
  /*text*/
  preview?: string | null;
  textPostText?: string | null;
  /*quote*/
  quotePostText?: string | null;
  quoteAuthor?: string | null;
  /*photo*/
  photo?: string | null;
  /*link*/
  link?: string | null;
  description?: string | null;
}
