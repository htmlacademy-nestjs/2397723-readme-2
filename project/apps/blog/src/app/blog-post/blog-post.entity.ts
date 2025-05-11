import {Entity} from '@project/core';
import {Post} from '@project/types';
import {BlogCommentEntity} from '../blog-comment/blog-comment.entity';
import {CreatePostDto} from './dto/create-post.dto';

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
    this.isPublished = data.isPublished ?? true;
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

  static fromDto(dto: CreatePostDto): BlogPostEntity {
    const entity = new BlogPostEntity();
    entity.authorId = dto.authorId;
    entity.tags = dto.tags;
    entity.isPublished = true;
    entity.creationDate = new Date();
    entity.publicationDate = new Date();
    entity.type = dto.type;
    entity.likesCount = 0;
    entity.comments = [];
    entity.commentsCount = 0;
    entity.isReposted = false;
    entity.originalPostId = undefined;
    entity.originalAuthorId = undefined;
    entity.title = dto.title;
    entity.youtubeLink = dto.youtubeLink;
    entity.preview = dto.preview;
    entity.textPostText = dto.textPostText;
    entity.quotePostText = dto.quotePostText;
    entity.quoteAuthor = dto.quoteAuthor;
    entity.photo = dto.photo;
    entity.link = dto.link;
    entity.description = dto.description;

    return entity;
  }
}
