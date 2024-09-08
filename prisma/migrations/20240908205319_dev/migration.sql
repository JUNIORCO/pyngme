/*
  Warnings:

  - Added the required column `status` to the `run` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RunStatus" AS ENUM ('Pending', 'Success', 'Failure');

-- AlterTable
ALTER TABLE "run" ADD COLUMN     "status" "RunStatus" NOT NULL;
