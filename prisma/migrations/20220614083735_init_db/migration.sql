/*
  Warnings:

  - You are about to drop the column `address` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `area` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `createdAT` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `fidelity_pts` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `id_societe` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Ranking` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Ranking" DROP CONSTRAINT "Ranking_fk_user_fkey";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "address",
DROP COLUMN "area",
DROP COLUMN "createdAT",
DROP COLUMN "fidelity_pts",
DROP COLUMN "id_societe",
ADD COLUMN     "accountType" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fidelityPts" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "lastLogin" TIMESTAMP(3),
ADD COLUMN     "ssoFacebook" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ssoGitHub" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ssoGoogle" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Ranking";

-- CreateTable
CREATE TABLE "UserHasSociete" (
    "id" SERIAL NOT NULL,
    "fk_user" INTEGER NOT NULL,
    "fk_society" INTEGER NOT NULL,

    CONSTRAINT "UserHasSociete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHasAdress" (
    "id" SERIAL NOT NULL,
    "fk_user" INTEGER NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "UserHasAdress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHasBilling" (
    "id" SERIAL NOT NULL,
    "fk_user" INTEGER NOT NULL,
    "Billing" TEXT NOT NULL,

    CONSTRAINT "UserHasBilling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Society" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "societeyAuth" TEXT NOT NULL,
    "area" TEXT,
    "societyName" TEXT NOT NULL,
    "sepa" TEXT NOT NULL,
    "idRestaurant" TEXT,

    CONSTRAINT "Society_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_key" ON "Users"("phone");

-- AddForeignKey
ALTER TABLE "UserHasSociete" ADD CONSTRAINT "UserHasSociete_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasSociete" ADD CONSTRAINT "UserHasSociete_fk_society_fkey" FOREIGN KEY ("fk_society") REFERENCES "Society"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasAdress" ADD CONSTRAINT "UserHasAdress_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasBilling" ADD CONSTRAINT "UserHasBilling_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
