-- DropForeignKey
ALTER TABLE "periodo" DROP CONSTRAINT "periodo_id_periodo_regular_fkey";

-- AlterTable
ALTER TABLE "periodo" ALTER COLUMN "id_periodo_regular" DROP NOT NULL,
ALTER COLUMN "id_periodo_regular" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "periodo" ADD CONSTRAINT "periodo_id_periodo_regular_fkey" FOREIGN KEY ("id_periodo_regular") REFERENCES "PeriodoRegular"("id") ON DELETE SET NULL ON UPDATE CASCADE;
