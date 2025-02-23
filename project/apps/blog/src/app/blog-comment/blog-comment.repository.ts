import {Injectable} from '@nestjs/common';
import {BaseMemoryRepository} from '@project/core';
import {BlogCommentEntity} from './blog-comment.entity';

@Injectable()
export class BlogCommentRepository extends BaseMemoryRepository<BlogCommentEntity> {
}
