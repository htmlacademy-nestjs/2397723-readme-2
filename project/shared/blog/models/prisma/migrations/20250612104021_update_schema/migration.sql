/*
  Warnings:

  - The primary key for the `comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `author` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `comments` table. All the data in the column will be lost.
  - The primary key for the `posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `author_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `comments_count` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `is_reposted` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `likes_count` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `original_author_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `quote_author` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `quote_post_text` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `text_post_text` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `youtube_link` on the `posts` table. All the data in the column will be lost.
  - The required column `comment_id` was added to the `comments` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `message` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - The required column `post_id` was added to the `posts` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `post_type` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PostToTag" DROP CONSTRAINT "_PostToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_fkey";

-- DropIndex
DROP INDEX "posts_title_idx";

-- AlterTable
ALTER TABLE "comments" DROP CONSTRAINT "comments_pkey",
DROP COLUMN "author",
DROP COLUMN "id",
DROP COLUMN "postId",
DROP COLUMN "text",
ADD COLUMN     "comment_id" TEXT NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "post_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "comments_pkey" PRIMARY KEY ("comment_id");

-- AlterTable
ALTER TABLE "posts" DROP CONSTRAINT "posts_pkey",
DROP COLUMN "author_id",
DROP COLUMN "comments_count",
DROP COLUMN "id",
DROP COLUMN "is_reposted",
DROP COLUMN "likes_count",
DROP COLUMN "original_author_id",
DROP COLUMN "quote_author",
DROP COLUMN "quote_post_text",
DROP COLUMN "text_post_text",
DROP COLUMN "type",
DROP COLUMN "youtube_link",
ADD COLUMN     "author" TEXT,
ADD COLUMN     "is_repost" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "likes" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "original_user_id" TEXT,
ADD COLUMN     "post_id" TEXT NOT NULL,
ADD COLUMN     "post_type" TEXT NOT NULL,
ADD COLUMN     "text" TEXT,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "posts_pkey" PRIMARY KEY ("post_id");

-- CreateIndex
CREATE INDEX "posts_user_id_idx" ON "posts"("user_id");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;
