import {Injectable} from '@nestjs/common';
import {BaseMemoryRepository} from '@project/core';
import {BlogPostEntity} from './blog-post.entity';

@Injectable()
export class BlogCPostRepository extends BaseMemoryRepository<BlogPostEntity> {

}
