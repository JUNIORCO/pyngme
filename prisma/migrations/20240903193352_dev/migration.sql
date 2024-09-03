-- CreateTable
CREATE TABLE "pyng" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "every" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "where" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pyng_pkey" PRIMARY KEY ("id")
);
