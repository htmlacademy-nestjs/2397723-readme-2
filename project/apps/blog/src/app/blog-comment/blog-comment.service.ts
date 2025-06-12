import {forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {Pagination} from '@project/types';
import {BlogPostService} from '../blog-post/blog-post.service';
import {CreateCommentDto} from './dto/create-comment.dto';
import {BlogCommentEntity} from './blog-comment.entity';
import {BlogCommentRepository} from './blog-comment.repository';
import {BlogCommentQuery} from './query/blog-comment.query';

@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository,
    @Inject(forwardRef(() => BlogPostService))
    private readonly blogPostService: BlogPostService,
  ) {
  }

  public async getComments(postId: string, query: BlogCommentQuery): Promise<Pagination<BlogCommentEntity>> {
    return this.blogCommentRepository.findByPostId(postId, query);
  }

  public async createComment(postId: string, dto: CreateCommentDto): Promise<BlogCommentEntity> {
    const existsPost = await this.blogPostService.getPost(postId);
    const newComment = BlogCommentEntity.fromDto(dto, existsPost.id);

    return this.blogCommentRepository.save(newComment);
  }

  public async deleteComment(id: string, authorId: string) {
    const existsComment = await this.blogCommentRepository.findById(id);
    if (existsComment?.authorId !== authorId) {
      throw new UnauthorizedException(`Comment owner is not user with userId: ${authorId}`);
    }
    try {
      await this.blogCommentRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Comment with ID ${id} not found.`);
    }
  }
}
