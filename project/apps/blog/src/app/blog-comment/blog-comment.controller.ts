import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';

import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';
import { BlogCommentService } from './blog-comment.service';
import {fillDto} from '@project/helpers';
import {DeleteCommentDto} from './dto/delete-comment.dto';

@Controller('post/:postId/comments')
export class BlogCommentController {
  constructor(
    private readonly blogCommentService: BlogCommentService,
  ) {}

  @Get('/')
  public async show(@Param('postId') postId: string) {
    const comments = await this.blogCommentService.getComments(postId);
    return fillDto(CommentRdo, comments.map((comment) => comment.toObject()));
  }

  @Post('/')
  public async create(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto
  ) {
    const newComment = await this.blogCommentService.createComment(postId, dto);
    return fillDto(CommentRdo, newComment.toObject());
  }

  @Delete(':commentId')
  public async delete(@Param('commentId') commentId: string, @Body() dto: DeleteCommentDto) {
    return await this.blogCommentService.deleteComment(commentId, dto)
  }
}
