/*
  Warnings:

  - The primary key for the `login` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[user_id]` on the table `login` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "login" DROP CONSTRAINT "login_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "login_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "login_user_id_key" ON "login"("user_id");
