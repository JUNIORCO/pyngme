/*
  Warnings:

  - Added the required column `name` to the `pyng` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pyng" ADD COLUMN     "name" TEXT NOT NULL;
