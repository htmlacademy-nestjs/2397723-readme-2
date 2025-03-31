import {Injectable} from '@nestjs/common';
import {CreatePostDto} from './dto/create-post.dto';
import dayjs from 'dayjs';
import {BlogPostEntity} from './blog-post.entity';
import {BlogPostRepository} from './blog-post.repository';
import {UpdatePostDto} from './dto/update-post.dto';
import {RepostDto} from './dto/repost-dto';
import {FindByTitleDto} from './dto/find-by-title.dto';
import {CreateCommentDto} from './dto/create-comment.dto';
import {DeleteCommentDto} from './dto/delete-comment.dto';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
  ) {

  }

  public async createPost(dto: CreatePostDto) {
    const post = {
      type: dto.type,
      title: dto.title,
      youtubeLink: dto.youtubeLink,
      preview: dto.preview,
      textPostText: dto.textPostText,
      quotePostText: dto.quotePostText,
      quoteAuthor: dto.quoteAuthor,
      photo: dto.photo,
      link: dto.link,
      description: dto.description,
      tags: dto.tags,
      creationDate: dayjs(dto.creationDate).toDate(),
      publicationDate: dayjs(dto.creationDate).toDate(),

      isPublished: true,
      authorId: '',
      isReposted: false,
      originalAuthorId: '',
      originalPostId: '',
      likesCount: 0,
      comments: [],
      commentsCount: 0,
    };

    const postEntity = new BlogPostEntity(post);

    return await this.blogPostRepository.save(postEntity);
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

  public async uploadImagesForPost() {

  }

  public async findPostByTitle(dto: FindByTitleDto) {
    return await this.blogPostRepository.findByTitle(dto.title)
  }

  public async getAllPosts() {
    return await this.blogPostRepository.getAll()
  }

  public async getAllPostsWithSort(sortType) {

  }

  public async getFeed() {

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

  public async createRepost(dto: RepostDto) {
    const existPost = await this.blogPostRepository.checkRepost(dto.userId, dto.postId, dto.originalAuthorId);
    const post = {
      type: existPost.type,
      title: existPost.title,
      youtubeLink: existPost.youtubeLink,
      preview: existPost.preview,
      textPostText: existPost.textPostText,
      quotePostText: existPost.quotePostText,
      quoteAuthor: existPost.quoteAuthor,
      photo: existPost.photo,
      link: existPost.link,
      description: existPost.description,
      tags: existPost.tags,
      creationDate: existPost.creationDate,
      publicationDate: dayjs().toDate(),

      isPublished: true,
      authorId: '',
      isReposted: true,
      originalAuthorId: existPost.authorId,
      originalPostId: existPost.id,
      likesCount: 0,
      comments: [],
      commentsCount: 0,
    };

    const postEntity = new BlogPostEntity(post);

    return await this.blogPostRepository.save(postEntity);
  }

  public async getSubscriptions() {

  }

  /*Comments*/

  public async createComment(postId: string, dto: CreateCommentDto) {
    const comment = {
      text: dto.text,
      author: dto.author,
    }
    await this.blogPostRepository.createComment(postId, comment);
  }

  public async deleteComment(commentId: string, postId: string, dto: DeleteCommentDto) {
    await this.blogPostRepository.deleteComment(commentId, postId, dto);
  }

  public async getComments(postId: string, page: number) {
    return await this.blogPostRepository.getComments(postId, page);
  }
}
