/*
  Warnings:

  - You are about to drop the column `telephone` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "telephone",
ADD COLUMN     "phone" TEXT;
