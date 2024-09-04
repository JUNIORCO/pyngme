/*
  Warnings:

  - Made the column `trigger_schedule_id` on table `pyng` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pyng" ALTER COLUMN "trigger_schedule_id" SET NOT NULL;
