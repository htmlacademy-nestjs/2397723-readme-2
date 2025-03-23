import {ConflictException, Injectable} from '@nestjs/common';
import {BaseMemoryRepository} from '@project/core';
import {BlogPostEntity} from './blog-post.entity';

@Injectable()
export class BlogPostRepository extends BaseMemoryRepository<BlogPostEntity> {
  public findByTitle(title: string): Promise<BlogPostEntity | null> {
    const entities = Array.from(this.entities.values());
    const post = entities.find((entity) => entity.title === title);
    return Promise.resolve(post);
  }
  public getAll(): Promise<BlogPostEntity[] | null> {
    const entities = Array.from(this.entities.values());
    return Promise.resolve(entities);
  }

  public async checkRepost(userId: string, postId: string, originalAuthorId: string): Promise<BlogPostEntity | null> {
    const entities = Array.from(this.entities.values());
    const usersEntities = entities.filter((entity) => entity.authorId = userId);
    const exam = usersEntities.find((entity) => entity.originalPostId === postId && entity.originalAuthorId === originalAuthorId);
    if (exam) {
      throw new ConflictException(`Repost is already exist`);
    }
    const post = await this.findByTitle(postId);
    return Promise.resolve(post);
  }
}
