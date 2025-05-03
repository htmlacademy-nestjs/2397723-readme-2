import {Entity} from '@project/core';
import {Post, PostType,} from '@project/types';
import {BlogCommentEntity} from '../blog-comment/blog-comment.entity';

export class BlogPostEntity implements Post, Entity<string, Post> {
  public id?: string;
  public authorId: string;
  public tags?: string;
  public isPublished: boolean;
  public creationDate: Date;
  public publicationDate: Date;
  public type: string;
  public likesCount: number;
  public comments: BlogCommentEntity[];
  public commentsCount: number;
  public isReposted: boolean;
  public originalAuthorId?: string;
  public originalPostId?: string;
  public title?: string;
  public youtubeLink?: string;
  public preview?: string;
  public textPostText?: string;
  public quotePostText?: string;
  public quoteAuthor?: string;
  public photo?: string;
  public link?: string;
  public description?: string;

  public populate(data: Post) {
    this.id = data.id ?? undefined;
    this.authorId = data.authorId;
    this.tags = data.tags;
    this.isPublished = data.isPublished;
    this.creationDate = data.creationDate ?? new Date();
    this.publicationDate = data.publicationDate ?? new Date();
    this.type = data.type;
    this.likesCount = data.likesCount || 0;
    this.comments = [];
    this.commentsCount = data.commentsCount || 0;
    this.isReposted = data.isReposted || false;
    this.originalAuthorId = data.originalAuthorId ?? undefined;
    this.originalPostId = data.originalPostId ?? undefined;
    this.title = data.title ?? undefined;
    this.youtubeLink = data.youtubeLink ?? undefined;
    this.preview = data.preview ?? undefined;
    this.textPostText = data.textPostText ?? undefined;
    this.quotePostText = data.quotePostText ?? undefined;
    this.quoteAuthor = data.quoteAuthor ?? undefined;
    this.photo = data.photo ?? undefined;
    this.link = data.link ?? undefined;
    this.description = data.description ?? undefined;

    return this
  }

  public toObject(): Post {
    return {
      id: this.id,
      authorId: this.authorId,
      tags: this.tags,
      isPublished: this.isPublished,
      creationDate: this.creationDate,
      publicationDate: this.publicationDate,
      type: this.type,
      likesCount: this.likesCount,
      comments: [],
      commentsCount: this.commentsCount,
      isReposted: this.isReposted,
      originalAuthorId: this.originalAuthorId,
      originalPostId: this.originalPostId,
      title: this.title,
      youtubeLink: this.youtubeLink,
      preview: this.preview,
      textPostText: this.textPostText,
      quotePostText: this.quotePostText,
      quoteAuthor: this.quoteAuthor,
      photo: this.photo,
      link: this.link,
      description: this.description,
    }
  }

  static fromObject(data: Post): BlogPostEntity {
    return new BlogPostEntity().populate(data)
  }
}
