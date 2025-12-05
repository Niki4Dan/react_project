/*
  Warnings:

  - You are about to drop the column `nick` on the `Idea` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ideaNick]` on the table `Idea` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ideaNick` to the `Idea` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Idea_nick_key";

-- AlterTable
ALTER TABLE "Idea" DROP COLUMN "nick",
ADD COLUMN     "ideaNick" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Idea_ideaNick_key" ON "Idea"("ideaNick");
