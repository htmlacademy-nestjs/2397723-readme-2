import {PrismaClient} from '@prisma/client';

const FIRST_USER_ID = '658170cbb954e9f5b905cc01';
const SECOND_USER_ID = '658170cbb954e9f5b905cc02';

const FIRST_TAG_ID = '39614113-7ad5-45b6-8093-06455437e1e1';
const SECOND_TAG_ID = '39614113-7ad5-45b6-8093-06455437e1e2';

const FIRST_POST_ID = '6d308040-96a2-4162-bea6-2338e9976501';
const SECOND_POST_ID = '6d308040-96a2-4162-bea6-2338e9976502';

function getTags() {
  return [
    {id: FIRST_TAG_ID, title: 'первый'},
    {id: SECOND_TAG_ID, title: 'второй'}
  ];
}

function getPosts() {
  return [
    {
      id: FIRST_POST_ID,
      title: 'Тестовая публикация',
      userId: FIRST_USER_ID,
      postType: 'text',
      preview: 'Превьючище',
      text: 'Расширенное содержание публикации',
      link: '',
      photo: '',
      description: '',
      tags: {
        connect: [{id: FIRST_TAG_ID}]
      },
      comments: [
        {
          text: 'Тест',
          userId: FIRST_USER_ID,
        }
      ]
    },
    {
      id: SECOND_POST_ID,
      userId: FIRST_USER_ID,
      postType: 'quote',
      text: 'JavaScript за 15 минут',
      author: 'Мамкин программист',
      tags: {
        connect: [
          {id: FIRST_TAG_ID},
          {id: SECOND_TAG_ID},
        ]
      },
      comments: [
        {
          text: 'Это действительно отличная книга!',
          userId: FIRST_USER_ID,
        },
        {
          text: 'Слишком много воды, там бы и 5 минут хватило',
          userId: SECOND_USER_ID,
        },
      ]
    }
  ]
}

async function seedDb(prismaClient: PrismaClient) {
  const mockTags = getTags();
  for (const tag of mockTags) {
    await prismaClient.tag.upsert({
      where: {id: tag.title},
      update: {},
      create: {
        title: tag.title,
      }
    });
  }

  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.post.create({
      data: {
        id: post.id,
        postType: post.postType,
        title: post.title || '',
        link: post.link || '',
        preview: post.preview || '',
        text: post.text || '',
        author: post.author || '',
        photo: post.photo || '',
        description: post.description || '',
        userId: post.userId,
        comments: post.comments ? {
          create: post.comments
        } : undefined
      }
    })
  }

  console.info('Database was filled');
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
