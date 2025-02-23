import {Entity} from '@project/core';
import {LinkPost, PhotoPost, Post, PostType, QuotePost, RepostedPost, TextPost, VideoPost} from '@project/types';

export class BlogPostEntity implements Post, TextPost, VideoPost, LinkPost, QuotePost, PhotoPost, RepostedPost, Entity<string> {
  public id?: string;
  public tags?: string;
  public author: string;
  public isPublished: boolean;
  public publicationDate: Date;
  public type: PostType;
  public isReposted: boolean;
  public originalAuthor: string;
  public title: string;
  public youtubeLink: string;
  public preview: string;
  public text: string;
  public quoteAuthor: string;
  public photo: string;
  public link: string


}
