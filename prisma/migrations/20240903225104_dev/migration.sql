/*
  Warnings:

  - You are about to drop the column `html` on the `run` table. All the data in the column will be lost.
  - Added the required column `scrape` to the `run` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "run" DROP COLUMN "html",
ADD COLUMN     "scrape" TEXT NOT NULL;
