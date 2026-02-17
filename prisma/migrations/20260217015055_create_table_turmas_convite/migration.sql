-- CreateTable
CREATE TABLE "turmaConvite" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "turma_id" TEXT NOT NULL,
    "criador_id" TEXT NOT NULL,
    "espira" TIMESTAMP(3) NOT NULL,
    "numero_usos" INTEGER NOT NULL DEFAULT 1,
    "currentUses" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "datacriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "turmaConvite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "turmaConvite_tokenHash_key" ON "turmaConvite"("tokenHash");

-- CreateIndex
CREATE INDEX "turmaConvite_turma_id_idx" ON "turmaConvite"("turma_id");

-- CreateIndex
CREATE INDEX "turmaConvite_datacriacao_idx" ON "turmaConvite"("datacriacao");

-- AddForeignKey
ALTER TABLE "turmaConvite" ADD CONSTRAINT "turmaConvite_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
