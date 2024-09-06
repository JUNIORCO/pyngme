/*
  Warnings:

  - Added the required column `stripe_customer_id` to the `pyng` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pyng" ADD COLUMN     "stripe_customer_id" TEXT NOT NULL;
