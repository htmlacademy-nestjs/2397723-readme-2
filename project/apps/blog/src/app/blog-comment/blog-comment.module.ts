import {forwardRef, Module} from '@nestjs/common';
import {PrismaClientModule} from '@project/models';
import {BlogCommentService} from './blog-comment.service';
import {BlogCommentRepository} from './blog-comment.repository';
import {BlogCommentController} from './blog-comment.controller';
import {BlogPostModule} from '../blog-post/blog-post.module';

@Module({
  imports: [PrismaClientModule, forwardRef(() => BlogPostModule)],
  controllers: [BlogCommentController],
  providers: [BlogCommentService, BlogCommentRepository],
  exports: [BlogCommentService],
})

export class BlogCommentModule {}
