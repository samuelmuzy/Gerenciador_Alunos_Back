-- DropForeignKey
ALTER TABLE "alunos" DROP CONSTRAINT "alunos_id_turma_fkey";

-- AlterTable
ALTER TABLE "alunos" ALTER COLUMN "id_turma" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "alunos" ADD CONSTRAINT "alunos_id_turma_fkey" FOREIGN KEY ("id_turma") REFERENCES "turmas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
