-- CreateTable
CREATE TABLE "User" (
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_key_key" ON "User"("key");
