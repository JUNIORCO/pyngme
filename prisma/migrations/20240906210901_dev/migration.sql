/*
  Warnings:

  - You are about to drop the column `user_id` on the `run` table. All the data in the column will be lost.
  - Added the required column `clerk_user_id` to the `run` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "run" DROP COLUMN "user_id",
ADD COLUMN     "clerk_user_id" TEXT NOT NULL;
