/*
  Warnings:

  - You are about to drop the column `sentEmail` on the `run` table. All the data in the column will be lost.
  - Added the required column `sent_email` to the `run` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `run` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "run" DROP COLUMN "sentEmail",
ADD COLUMN     "sent_email" BOOLEAN NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;
