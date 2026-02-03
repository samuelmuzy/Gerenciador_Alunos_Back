-- AlterTable
ALTER TABLE "periodo" ADD COLUMN     "id_periodo_regular" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "PeriodoRegular" (
    "id" TEXT NOT NULL,
    "data_Incicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PeriodoRegular_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "periodo" ADD CONSTRAINT "periodo_id_periodo_regular_fkey" FOREIGN KEY ("id_periodo_regular") REFERENCES "PeriodoRegular"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
