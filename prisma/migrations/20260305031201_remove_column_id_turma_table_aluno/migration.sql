/*
  Warnings:

  - You are about to drop the column `id_turma` on the `alunos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "alunos" DROP CONSTRAINT "alunos_id_turma_fkey";

-- AlterTable
ALTER TABLE "alunos" DROP COLUMN "id_turma",
ADD COLUMN     "turmaId" TEXT;

-- AddForeignKey
ALTER TABLE "alunos" ADD CONSTRAINT "alunos_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "turmas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
