import {PrismaClient} from '@prisma/client';

const FIRST_USER_ID = '658170cbb954e9f5b905cc01';
const SECOND_USER_ID = '658170cbb954e9f5b905cc02';
const THIRD_USER_ID = '658170cbb954e9f5b905cc03';

const FIRST_POST_ID = '6d308040-96a2-4162-bea6-2338e9976501';
const SECOND_POST_ID = '6d308040-96a2-4162-bea6-2338e9976502';
const THIRD_POST_ID = '6d308040-96a2-4162-bea6-2338e9976503';
const FOURTH_POST_ID = '6d308040-96a2-4162-bea6-2338e9976504';
const FIFTH_POST_ID = '6d308040-96a2-4162-bea6-2338e9976505';

const FIRST_COMMENT_ID = 'efd775e2-df55-4e0e-a308-58249f5ea201'
const SECOND_COMMENT_ID = 'efd775e2-df55-4e0e-a308-58249f5ea202'
const THIRD_COMMENT_ID = 'efd775e2-df55-4e0e-a308-58249f5ea203'
const FOURTH_COMMENT_ID = 'efd775e2-df55-4e0e-a308-58249f5ea204'
const FIFTH_COMMENT_ID = 'efd775e2-df55-4e0e-a308-58249f5ea205'
const SIXTH_COMMENT_ID = 'efd775e2-df55-4e0e-a308-58249f5ea206'
const SEVENTH_COMMENT_ID = 'efd775e2-df55-4e0e-a308-58249f5ea207'
const EIGHTH_COMMENT_ID = 'efd775e2-df55-4e0e-a308-58249f5ea208'
const NINTH_COMMENT_ID = 'efd775e2-df55-4e0e-a308-58249f5ea209'
const TENTH_COMMENT_ID = 'efd775e2-df55-4e0e-a308-58249f5ea210'

function getPosts() {
  return [
    {
      id: FIRST_POST_ID,
      author_id: FIRST_USER_ID,
      tags: 'firstTag, secondTag',
      isPublished: true,
      publicationDate: new Date(),
      type: 'text',
      likesCount: 0,
      comments: [
        {
          id: FIRST_COMMENT_ID,
          text: 'First comment',
          author: FIRST_USER_ID,
        }, {
          id: SECOND_COMMENT_ID,
          text: 'Second comment',
          author: FIRST_USER_ID,
        },
      ],
      commentsCount: 2,
      isReposted: false,
      title: 'First post title',
      preview: 'First post preview',
      textPostText: 'First post amazing text',
    },
    {
      id: SECOND_POST_ID,
      author_id: FIRST_USER_ID,
      tags: 'secondTag, thirdTag',
      isPublished: true,
      publicationDate: new Date(),
      type: 'video',
      likesCount: 1,
      comments: [
        {
          id: THIRD_COMMENT_ID,
          text: 'Third comment',
          author: SECOND_USER_ID,
        }, {
          id: FOURTH_COMMENT_ID,
          text: 'Fourth comment',
          author: SECOND_USER_ID,
        },
      ],
      commentsCount: 2,
      isReposted: true,
      originalAuthorId: SECOND_USER_ID,
      originalPostId: THIRD_POST_ID,
      title: 'Second post title? reposted',
      youtubeLink: 'https://www.youtube.com/watch?v=',
    },
    {
      id: THIRD_POST_ID,
      author_id: SECOND_USER_ID,
      tags: 'secondTag, thirdTag',
      isPublished: true,
      publicationDate: new Date(),
      type: 'video',
      likesCount: 5,
      comments: [
        {
          id: FIFTH_COMMENT_ID,
          text: 'Fifth comment',
          author: THIRD_USER_ID,
        }, {
          id: SIXTH_COMMENT_ID,
          text: 'Sixth comment',
          author: THIRD_USER_ID,
        },
      ],
      commentsCount: 2,
      isReposted: false,
      title: 'Third post title',
      youtubeLink: 'https://www.youtube.com/watch?v=',
    },
    {
      id: FOURTH_POST_ID,
      author_id: THIRD_USER_ID,
      tags: 'fifthTag, secondTag',
      isPublished: true,
      publicationDate: new Date(),
      type: 'quote',
      likesCount: 2048,
      comments: [
        {
          id: SEVENTH_COMMENT_ID,
          text: 'Seventh comment',
          author: FIRST_USER_ID,
        }, {
          id: EIGHTH_COMMENT_ID,
          text: 'Eighth comment',
          author: SECOND_USER_ID,
        },
      ],
      commentsCount: 2,
      isReposted: false,
      quotePostText: 'Learn to swim',
      quoteAuthor: 'M. J. Keenan'
    },
    {
      id: FIFTH_POST_ID,
      author_id: SECOND_USER_ID,
      tags: 'firstTag, fourthTag, sixthTag',
      isPublished: true,
      publicationDate: new Date(),
      type: 'photo',
      likesCount: 56,
      comments: [{
        id: NINTH_COMMENT_ID,
        text: 'Ninth comment',
        author: SECOND_USER_ID,
      }, {
        id: TENTH_COMMENT_ID,
        text: 'Tenth comment',
        author: THIRD_USER_ID,
      },],
      commentsCount: 2,
      isReposted: false,
      photo: 'https://avatars.mds.yandex.net/i?id=35fc5c02d1ddb9de057ec53f379fc0ef_l-10703010-images-thumbs&n=13'
    },
  ]
}

async function seedDb(prismaClient: PrismaClient) {
  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.post.create({
      data: {
        id: post.id,
        authorId: post.author_id,
        tags: post.tags,
        isPublished: post.isPublished,
        publicationDate: post.publicationDate,
        type: post.type,
        likesCount: post.likesCount,
        comments: post.comments ? {
          create: post.comments
        } : undefined,
        commentsCount: post.commentsCount,
        isReposted: post.isReposted,
        originalAuthorId: post.originalAuthorId ? post.originalAuthorId : undefined,
        originalPostId: post.originalPostId ? post.originalPostId : undefined,
        title: post.title ? post.title : undefined,
        youtubeLink: post.youtubeLink ? post.youtubeLink : undefined,
        preview: post.preview ? post.preview : undefined,
        textPostText: post.textPostText ? post.textPostText : undefined,
        quotePostText: post.quotePostText ? post.quotePostText : undefined,
        quoteAuthor: post.quoteAuthor ? post.quoteAuthor : undefined,
        link: post.photo ? post.photo : undefined,
      }
    })
  }

  console.info('Database was fulled')
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
