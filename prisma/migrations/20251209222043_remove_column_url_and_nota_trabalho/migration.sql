/*
  Warnings:

  - You are about to drop the column `nota` on the `trabalho` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `trabalho` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "trabalho" DROP COLUMN "nota",
DROP COLUMN "url";
