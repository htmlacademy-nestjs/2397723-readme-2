import { Injectable } from '@nestjs/common';

import { BlogPostService } from '../blog-post/blog-post.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { BlogCommentEntity } from './blog-comment.entity';
import { BlogCommentRepository } from './blog-comment.repository';
import {DeleteCommentDto} from './dto/delete-comment.dto';

@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly blogPostService: BlogPostService,
  ) {}

  public async getComments(postId: string): Promise<BlogCommentEntity[]> {
    return this.blogCommentRepository.findByPostId(postId);
  }

  public async createComment(postId: string, dto: CreateCommentDto): Promise<BlogCommentEntity> {
    const existsPost = await this.blogPostService.getPostDetails(postId);
    const newComment = BlogCommentEntity.fromDto(dto, existsPost.id);
    return this.blogCommentRepository.save(newComment);
  }

  public async deleteComment(commentId: string, dto: DeleteCommentDto): Promise<void> {
    await this.blogCommentRepository.deleteComment(commentId, dto)
  }
}
