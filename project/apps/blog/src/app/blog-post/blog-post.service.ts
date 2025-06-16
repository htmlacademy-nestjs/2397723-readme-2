import {Injectable} from '@nestjs/common';
import {CreatePostDto} from './dto/create-post.dto';
import {BlogPostEntity} from './blog-post.entity';
import {BlogPostRepository} from './blog-post.repository';
import {UpdatePostDto} from './dto/update-post.dto';
import {RepostDto} from './dto/repost-dto';
import {FindByTitleDto} from './dto/find-by-title.dto';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
  ) {
  }

  public async getAllPosts(): Promise<BlogPostEntity[]> {
    return this.blogPostRepository.findAll()
  }

  public async createPost(dto: CreatePostDto): Promise<BlogPostEntity> {
    const newPost = BlogPostEntity.fromDto(dto);
    await this.blogPostRepository.save(newPost);

    return newPost;
  }

  public async getPostDetails(id: string) {
    return await this.blogPostRepository.findById(id);
  }

  public async updatePost(postId: string, dto: UpdatePostDto) {
    const existsPost = await this.blogPostRepository.findById(postId);
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existsPost[key] !== value) {
        existsPost[key] = value;
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return existsPost;
    }

    return await this.blogPostRepository.update(postId, existsPost);
  }

  public async deletePost(id: string) {
    return await this.blogPostRepository.deleteById(id)
  }

  public async findPostByTitle(dto: FindByTitleDto) {
    return await this.blogPostRepository.findByTitle(dto.title)
  }

  public async setLike(id: string) {
    const existsPost = await this.blogPostRepository.findById(id);
    existsPost.likesCount = existsPost.likesCount + 1;
    return await this.blogPostRepository.update(id, existsPost);
  }

  public async removeLike(id: string) {
    const existsPost = await this.blogPostRepository.findById(id);
    existsPost.likesCount = existsPost.likesCount - 1;
    return await this.blogPostRepository.update(id, existsPost);
  }

  public async createRepost(id: string, dto: RepostDto) {
    return await this.blogPostRepository.createRepost(id, dto);
  }
}
