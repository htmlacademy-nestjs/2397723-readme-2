import {Injectable} from '@nestjs/common';
import {BaseMemoryRepository} from '@project/core';
import {BlogPostEntity} from './blog-post.entity';

@Injectable()
export class BlogPostRepository extends BaseMemoryRepository<BlogPostEntity> {
  public findByTitle(title: string): Promise<BlogPostEntity | null> {
    const entities = Array.from(this.entities.values());
    const post = entities.find((entity) => entity.title === title);
    return Promise.resolve(post);
  }
}
