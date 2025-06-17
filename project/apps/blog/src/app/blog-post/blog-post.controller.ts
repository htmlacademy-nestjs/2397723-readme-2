import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get, HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post, Query,
} from '@nestjs/common';
import {fillDto} from '@project/helpers';
import {BlogPostService} from './blog-post.service';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {BlogPostQuery} from './query/blog-post.query';
import {API} from './blog-post.const';
import {BlogPostSearchQuery} from './query/blog-post-search.query';
import {BlogPostRdo} from './rdo/blog-post.rdo';
import {BlogPostWithPaginationRdo} from './rdo/blog-post-with-pagination.rdo';
import {BlogPostMoreRdo} from './rdo/blog-post-more.rdo';
import {UserIdDto} from './dto/user-id.dto';
import {ToggleLikeDto} from './dto/toggle-like.dto';

@ApiTags('blog service')
@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService
  ) {
  }

  @ApiResponse({
    type: BlogPostQuery,
    status: HttpStatus.OK,
    description: API.FOUNDED,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/')
  public async index(
    @Query()
      query: BlogPostQuery,
  ) {
    const postsWithPagination = await this.blogPostService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map(post => fillDto(BlogPostRdo, post.toObject())),
    }

    return fillDto(BlogPostWithPaginationRdo, result);
  }

  @ApiResponse({
    type: CreatePostDto,
    status: HttpStatus.CREATED,
    description: API.CREATED,
  })
  @Post('/')
  public async create(
    @Body()
      dto: CreatePostDto,
  ) {
    const newPost = await this.blogPostService.createPost(dto);

    return fillDto(BlogPostRdo, newPost.toObject());
  }

  @ApiResponse({
    type: BlogPostSearchQuery,
    status: HttpStatus.OK,
    description: API.SEARCH,
  })
  @Get('/search')
  public async search(
    @Query()
      query: BlogPostSearchQuery,
  ) {
    const result = await this.blogPostService.searchPosts(query.substring);

    return fillDto(BlogPostRdo, result);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: API.FOUNDED,
  })
  @Get('/:id')
  public async show(
    @Param('id')
      id: string,
  ) {
    const post = await this.blogPostService.getPost(id);

    return fillDto(BlogPostMoreRdo, post.toObject());
  }

  @ApiResponse({
    type: UpdatePostDto,
    status: HttpStatus.FOUND,
    description: API.UPDATE,
  })
  @Patch('/:id')
  public async update(
    @Param('id')
      id: string,
    @Body()
      dto: UpdatePostDto,
  ) {
    const updatedPost = await this.blogPostService.updatePost(id, dto, dto.userId);

    return fillDto(BlogPostRdo, updatedPost.toObject());
  }

  @ApiResponse({
    type: UserIdDto,
    status: HttpStatus.FOUND,
    description: API.UPDATE,
  })
  @Patch('/status/:id')
  public async updateStatus(
    @Param('id')
      id: string,
    @Body()
      {userId}: UserIdDto,
  ) {
    const updatedPost = await this.blogPostService.updatePostStatus(id, userId);

    return fillDto(BlogPostRdo, updatedPost.toObject());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: API.DELETE,
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(
    @Param('id')
      id: string,
    @Body()
      {userId}: UserIdDto,
  ) {
    await this.blogPostService.deletePost(id, userId);
  }

  @ApiResponse({
    type: ToggleLikeDto,
    status: HttpStatus.FOUND,
    description: API.LIKE,
  })
  @Patch('/like/:id')
  public async like(
    @Param('id')
      id: string,
    @Body()
      {likeId}: ToggleLikeDto,
  ) {
    const updatedPost = await this.blogPostService.toggleLike(id, likeId);

    return fillDto(BlogPostRdo, updatedPost.toObject());
  }

  @ApiResponse({
    type: CreatePostDto,
    status: HttpStatus.CREATED,
    description: API.REPOST,
  })
  @Post('/repost/:id')
  public async repost(
    @Param('id')
      id: string,
    @Body()
      dto: UserIdDto,
  ) {
    return fillDto(BlogPostRdo, await this.blogPostService.repostPost(id, dto.userId));
  }
}
