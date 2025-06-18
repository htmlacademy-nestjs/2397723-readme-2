import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  NestInterceptor
} from '@nestjs/common';
import {validate} from 'class-validator';
import {plainToInstance} from 'class-transformer';
import {Post, PostEnum} from '@project/types';
import {CreateTextPostDto} from '../dto/create-text-post.dto';
import {CreateVideoPostDto} from '../dto/create-video-post.dto';
import {CreateQuotePostDto} from '../dto/create-quote-post.dto';
import {CreatePhotoPostDto} from '../dto/create-photo-post.dto';
import {CreateLinkPostDto} from '../dto/create-link-post.dto';
import {CreatePostDto} from '../dto/create-post.dto';

export class BlogPostValidateInterceptor implements NestInterceptor {
  private getDto(postType) {
    switch (postType) {
      case PostEnum.Video:
        return CreateVideoPostDto;
      case PostEnum.Text:
        return CreateTextPostDto;
      case PostEnum.Quote:
        return CreateQuotePostDto;
      case PostEnum.Photo:
        return CreatePhotoPostDto;
      case PostEnum.Link:
        return CreateLinkPostDto;
      default:
        return CreatePostDto;
    }
  }

  public async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const post: Post = request.body;
    let validationResult;

    validationResult = await validate(
      plainToInstance(this.getDto(post.postType), post),
      {validationError: {target: false}}
    );

    if (validationResult) {
      const errors = [];

      validationResult.forEach(item => {
        for (let key in item.constraints) {
          errors.push(item.constraints[key]);
        }
      });

      if (errors.length) {
        throw new BadRequestException(errors);
      }
    }

    return next.handle();
  }
}
