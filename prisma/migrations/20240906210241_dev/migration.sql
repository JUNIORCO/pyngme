/*
  Warnings:

  - You are about to drop the column `user_id` on the `pyng` table. All the data in the column will be lost.
  - Added the required column `clerk_user_id` to the `pyng` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pyng" DROP COLUMN "user_id",
ADD COLUMN     "clerk_user_id" TEXT NOT NULL;
