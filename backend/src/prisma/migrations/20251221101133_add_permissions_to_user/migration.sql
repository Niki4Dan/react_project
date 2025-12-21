-- CreateEnum
CREATE TYPE "UserPermissons" AS ENUM ('BLOCK_IDEAS', 'ALL');

-- AlterTable
ALTER TABLE "Idea" ADD COLUMN     "blockedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" "UserPermissons"[];
