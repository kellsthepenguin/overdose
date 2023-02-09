-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "pw" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_pw_key" ON "User"("pw");
