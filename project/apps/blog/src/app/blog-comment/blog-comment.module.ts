import {Module} from '@nestjs/common';
import {BlogCommentService} from './blog-comment.service';
import {BlogCommentRepository} from './blog-comment.repository';
import {BlogCommentController} from './blog-comment.controller';
import {PrismaClientModule} from '@project/models';
import {BlogPostModule} from '../blog-post/blog-post.module';

@Module({
  imports: [BlogPostModule, PrismaClientModule],
  controllers: [BlogCommentController],
  providers: [BlogCommentService, BlogCommentRepository],
})

export class BlogCommentModule {}
