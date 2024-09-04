-- CreateTable
CREATE TABLE "run" (
    "id" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "reasoning" TEXT NOT NULL,
    "sentEmail" BOOLEAN NOT NULL,
    "pyng_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "run_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "run" ADD CONSTRAINT "run_pyng_id_fkey" FOREIGN KEY ("pyng_id") REFERENCES "pyng"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
