/*
  Warnings:

  - You are about to drop the column `where` on the `pyng` table. All the data in the column will be lost.
  - Added the required column `condition` to the `pyng` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pyng" DROP COLUMN "where",
ADD COLUMN     "condition" TEXT NOT NULL;
