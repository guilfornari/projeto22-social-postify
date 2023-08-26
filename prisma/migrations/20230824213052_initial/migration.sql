-- CreateTable
CREATE TABLE "posts" (
    "created_at" TIMESTAMP(3),
    "id" SERIAL NOT NULL,
    "title" TEXT,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);
