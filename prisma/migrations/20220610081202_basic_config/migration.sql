/*
  Warnings:

  - You are about to drop the `Drivers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Restaurants` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fidelity_pts` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "address" TEXT,
ADD COLUMN     "area" TEXT,
ADD COLUMN     "coordonate" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "fidelity_pts" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "id_societe" TEXT,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "telephone" TEXT;

-- DropTable
DROP TABLE "Drivers";

-- DropTable
DROP TABLE "Orders";

-- DropTable
DROP TABLE "Payments";

-- DropTable
DROP TABLE "Restaurants";

-- CreateTable
CREATE TABLE "Ranking" (
    "id" SERIAL NOT NULL,
    "stars" DOUBLE PRECISION NOT NULL,
    "commentary" TEXT NOT NULL,
    "fk_user" INTEGER NOT NULL,

    CONSTRAINT "Ranking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Ranking" ADD CONSTRAINT "Ranking_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
