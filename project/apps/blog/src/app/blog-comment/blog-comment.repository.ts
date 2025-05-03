import {Injectable} from '@nestjs/common';
import {BasePostgresRepository} from '@project/core';
import {BlogCommentEntity} from './blog-comment.entity';
import {Comment} from '@project/types';

@Injectable()
export class BlogCommentRepository extends BasePostgresRepository<BlogCommentEntity, Comment> {
}
