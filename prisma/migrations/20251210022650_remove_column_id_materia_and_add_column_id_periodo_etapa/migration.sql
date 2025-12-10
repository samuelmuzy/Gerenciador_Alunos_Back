/*
  Warnings:

  - You are about to drop the column `id_materia` on the `etapa` table. All the data in the column will be lost.
  - Added the required column `id_periodo` to the `etapa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "etapa" DROP CONSTRAINT "etapa_id_materia_fkey";

-- AlterTable
ALTER TABLE "etapa" DROP COLUMN "id_materia",
ADD COLUMN     "id_periodo" TEXT NOT NULL,
ADD COLUMN     "materiaId" TEXT;

-- AddForeignKey
ALTER TABLE "etapa" ADD CONSTRAINT "etapa_id_periodo_fkey" FOREIGN KEY ("id_periodo") REFERENCES "periodo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "etapa" ADD CONSTRAINT "etapa_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "materia"("id") ON DELETE SET NULL ON UPDATE CASCADE;
