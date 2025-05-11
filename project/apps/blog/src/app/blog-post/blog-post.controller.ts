import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {BlogPostService} from './blog-post.service';
import {CreatePostDto} from './dto/create-post.dto';
import {fillDto} from '@project/helpers';
import {CreatePostRdo} from './rdo/create-post.rdo';
import {UpdatePostDto} from './dto/update-post.dto';
import {RepostDto} from './dto/repost-dto';
import {FindByTitleDto} from './dto/find-by-title.dto';

@ApiTags('blog service')
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
    if (!newPost) {
      throw new HttpException('Post not created', HttpStatus.BAD_REQUEST);
    }
    return fillDto(CreatePostRdo, newPost.toObject());
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Get('/')
  public async getAllPosts() {
    return await this.blogPostService.getAllPosts();
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Get('find-by-title')
  public async findByTitle(@Body() dto: FindByTitleDto) {
    const existPost = await this.blogPostService.findPostByTitle(dto);
    if (!existPost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return fillDto(CreatePostRdo, existPost.toObject());
  }

  @ApiResponse({
    status: HttpStatus.OK
  })
  @Get(':id')
  public async getDetails(@Param('id') id: string) {
    const existPost = await this.blogPostService.getPostDetails(id);
    if (!existPost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return fillDto(CreatePostRdo, existPost.toObject());
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Patch(':id')
  public async updatePost(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const existPost = await this.blogPostService.updatePost(id, dto);
    if (!existPost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return fillDto(UpdatePostDto, existPost.toObject());
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Delete(':id')
  public async deletePost(@Param('id') id: string) {
    return await this.blogPostService.deletePost(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Patch(':id/set-like')
  public async setLike(@Param('id') id: string) {
    return await this.blogPostService.setLike(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Patch(':id/remove-like')
  public async removeLike(@Param('id') id: string) {
    return await this.blogPostService.removeLike(id);
  }

  @Post(':id/repost')
  public async repost(@Param('id') id: string, @Body() dto: RepostDto) {
    return await this.blogPostService.createRepost(id, dto)
  }
}
