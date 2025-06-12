import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query} from '@nestjs/common';
import {fillDto} from '@project/helpers';
import {CreateCommentDto} from './dto/create-comment.dto';
import {BlogCommentRdo} from './rdo/blog-comment.rdo';
import {BlogCommentService} from './blog-comment.service';
import {DeleteCommentDto} from './dto/delete-comment.dto';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {API} from './blog-comment.constant';
import {BlogCommentQuery} from './query/blog-comment.query';
import {BlogCommentWithPaginationRdo} from './query/blog-comment-with-pagination.query';

@ApiTags('Blog comment service')
@Controller('posts/:id/comments')
export class BlogCommentController {
  constructor(
    private readonly blogCommentService: BlogCommentService,
  ) {
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: API.SHOW,
  })
  @Get('/')
  public async show(
    @Param('id')
      id: string,
    @Query()
      query: BlogCommentQuery,
  ) {
    const commentsWithPagination = await this.blogCommentService.getComments(id, query);
    const result = {
      ...commentsWithPagination,
      entities: commentsWithPagination.entities.map(comment => comment.toObject()),
    }

    return fillDto(BlogCommentWithPaginationRdo, result);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: API.CREATE,
  })
  @Post('/')
  public async create(
    @Param('id')
      id: string,
    @Body()
      dto: CreateCommentDto,
  ) {
    const newComment = await this.blogCommentService.createComment(id, dto);

    return fillDto(BlogCommentRdo, newComment.toObject());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: API.DELETE,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/')
  public async delete(
    @Param('id')
      id: string,
    @Body()
      dto: DeleteCommentDto,
  ) {
    console.log("ID", id)
    await this.blogCommentService.deleteComment(id, dto.authorId);
  }
}
