import {randomUUID} from 'node:crypto';
import {ConflictException, Injectable} from '@nestjs/common';
import {BaseMemoryRepository} from '@project/core';
import {BlogPostEntity} from './blog-post.entity';
import {CreateCommentDto} from './dto/create-comment.dto';
import dayjs from 'dayjs';
import {PAGE_SIZE} from './blog-post.const';
import {DeleteCommentDto} from './dto/delete-comment.dto';

@Injectable()
export class BlogPostRepository extends BaseMemoryRepository<BlogPostEntity> {
  public findByTitle(title: string): Promise<BlogPostEntity | null> {
    const entities = Array.from(this.entities.values());
    const post = entities.find((entity) => entity.title === title);
    return Promise.resolve(post);
  }

  public getAll(): Promise<BlogPostEntity[] | null> {
    const entities = Array.from(this.entities.values());
    return Promise.resolve(entities);
  }

  public async checkRepost(userId: string, postId: string, originalAuthorId: string): Promise<BlogPostEntity | null> {
    const entities = Array.from(this.entities.values());
    const usersEntities = entities.filter((entity) => entity.authorId = userId);
    const exam = usersEntities.find((entity) => entity.originalPostId === postId && entity.originalAuthorId === originalAuthorId);
    if (exam) {
      throw new ConflictException(`Repost is already exist`);
    }
    const post = await this.findByTitle(postId);
    return Promise.resolve(post);
  }

  public async createComment(postId: string, dto: CreateCommentDto) {
    const comment = {
      ...dto,
      id: randomUUID(),
      creationDate: dayjs().toDate()
    };
    this.entities.get(postId).comments.push(comment);
  }

  public async deleteComment(commentId: string, postId: string, dto: DeleteCommentDto) {
    const comment = this.entities.get(postId).comments.find((comment) => comment.id === commentId);
    if (comment.author === dto.authorId) {
      const commentIndex = this.entities.get(postId).comments.findIndex((comment) => comment.id === commentId);
      this.entities.get(postId).comments.splice(commentIndex, 1);
    }
  }

  public async getComments(postId: string, page: number) {
    console.log(`id: ${postId} page: ${page}`);
    const comments = this.entities.get(postId).comments;
    if (comments.length <= PAGE_SIZE) {
      return Promise.resolve(comments);
    }
    const pageStart = (page - 1) * PAGE_SIZE;
    const pageEnd = page * PAGE_SIZE - 1;
    return comments.slice(pageStart, pageEnd);
  }
}
