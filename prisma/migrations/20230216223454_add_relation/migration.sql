-- DropIndex
DROP INDEX "User_pw_key";

-- CreateTable
CREATE TABLE "Relations" (
    "id" SERIAL NOT NULL,
    "firstId" TEXT NOT NULL,
    "secondId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Relations_id_key" ON "Relations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Relations_firstId_key" ON "Relations"("firstId");

-- CreateIndex
CREATE UNIQUE INDEX "Relations_secondId_key" ON "Relations"("secondId");

-- AddForeignKey
ALTER TABLE "Relations" ADD CONSTRAINT "Relations_firstId_fkey" FOREIGN KEY ("firstId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relations" ADD CONSTRAINT "Relations_secondId_fkey" FOREIGN KEY ("secondId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
