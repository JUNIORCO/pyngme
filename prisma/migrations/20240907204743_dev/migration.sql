-- DropForeignKey
ALTER TABLE "run" DROP CONSTRAINT "run_pyng_id_fkey";

-- AddForeignKey
ALTER TABLE "run" ADD CONSTRAINT "run_pyng_id_fkey" FOREIGN KEY ("pyng_id") REFERENCES "pyng"("id") ON DELETE CASCADE ON UPDATE CASCADE;
