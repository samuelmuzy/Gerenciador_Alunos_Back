/*
  Warnings:

  - Added the required column `public_id` to the `aluno_trabalho` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aluno_trabalho" ADD COLUMN     "public_id" TEXT NOT NULL;
