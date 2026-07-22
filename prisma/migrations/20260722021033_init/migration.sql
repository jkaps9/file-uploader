-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('FOLDER', 'FILE');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EntityType" NOT NULL,
    "size" INTEGER,
    "mimeType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentId" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "entities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shared_folders" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "folderId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shared_folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "entities_parentId_idx" ON "entities"("parentId");

-- CreateIndex
CREATE INDEX "entities_userId_idx" ON "entities"("userId");

-- CreateIndex
CREATE INDEX "shared_folders_userId_idx" ON "shared_folders"("userId");

-- CreateIndex
CREATE INDEX "shared_folders_folderId_idx" ON "shared_folders"("folderId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sid_key" ON "sessions"("sid");

-- AddForeignKey
ALTER TABLE "entities" ADD CONSTRAINT "entities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entities" ADD CONSTRAINT "entities_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "entities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shared_folders" ADD CONSTRAINT "shared_folders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shared_folders" ADD CONSTRAINT "shared_folders_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "entities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
