import {Module} from '@nestjs/common';
import {BlogPostModule} from './blog-post/blog-post.module';
import {BlogCommentModule} from './blog-comment/blog-comment.module';
import {BlogTagModule} from './blog-tag/blog-tag.module';

@Module({
  imports: [BlogPostModule, BlogCommentModule, BlogTagModule],
  controllers: [],
  providers: [],
})

export class AppModule {
}
