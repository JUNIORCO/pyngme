/*
  Warnings:

  - Changed the type of `every` on the `pyng` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EveryOption" AS ENUM ('FifteenMinutes', 'Hour', 'FourHours', 'Day');

-- AlterTable
ALTER TABLE "pyng" DROP COLUMN "every",
ADD COLUMN     "every" "EveryOption" NOT NULL;
