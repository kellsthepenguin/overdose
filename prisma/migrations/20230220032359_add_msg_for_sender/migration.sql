/*
  Warnings:

  - Added the required column `textForSender` to the `Chats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chats" ADD COLUMN     "textForSender" TEXT NOT NULL;
