import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {BlogPostService} from './blog-post.service';
import {CreatePostDto} from './dto/create-post.dto';
import {fillDto} from '@project/helpers';
import {CreatePostRdo} from './rdo/create-post.rdo';
import {UpdatePostDto} from './dto/update-post.dto';
import {RepostDto} from './dto/repost-dto';
import {FindByTitleDto} from './dto/find-by-title.dto';

@ApiTags('blog')
@Controller('post')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService
  ) {
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New post has been created successfully.',
  })
  @Post('create')
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.blogPostService.createPost(dto);
    return fillDto(CreatePostRdo, newPost.toObject());
  }

  @Get('/')
  public async getAllPosts() {
    return await this.blogPostService.getAllPosts();
  }

  @Get('find-by-title')
  public async findByTitle(@Body() dto: FindByTitleDto) {
    const existPost = await this.blogPostService.findPostByTitle(dto);
    if (!existPost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return fillDto(CreatePostRdo, existPost.toObject());
  }

  @Get(':id')
  public async getDetails(@Param('id') id: string) {
    const existPost = await this.blogPostService.getPostDetails(id);
    if (!existPost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return fillDto(CreatePostRdo, existPost.toObject());
  }

  @Patch(':id')
  public async updatePost(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const existPost = await this.blogPostService.updatePost(id, dto);
    if (!existPost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return fillDto(UpdatePostDto, existPost.toObject());
  }

  @Delete(':id')
  public async deletePost(@Param('id') id: string) {
    return await this.blogPostService.deletePost(id);
  }

  @Patch(':id/set-like')
  public async setLike(@Param('id') id: string) {
    return await this.blogPostService.setLike(id);
  }

  @Patch(':id/remove-like')
  public async removeLike(@Param('id') id: string) {
    return await this.blogPostService.removeLike(id);
  }

  @Post('repost')
  public async repost(@Body() dto: RepostDto) {
    return await this.blogPostService.createRepost(dto)
  }
}
