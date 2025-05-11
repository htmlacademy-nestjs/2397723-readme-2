import {Module} from '@nestjs/common';
import {BlogPostController} from './blog-post.controller';
import {BlogPostService} from './blog-post.service';
import {BlogPostRepository} from './blog-post.repository';
import {PrismaClientModule} from '@project/models';

@Module({
  imports: [PrismaClientModule],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository],
  exports: [BlogPostService],
})

export class BlogPostModule {}
