/*
  Warnings:

  - A unique constraint covering the columns `[idx]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "idx" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_idx_key" ON "User"("idx");
