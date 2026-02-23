-- CreateTable
CREATE TABLE "Conteudo" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "url_documento" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "data_liberacao" TIMESTAMP(3) NOT NULL,
    "id_etapa" TEXT NOT NULL,

    CONSTRAINT "Conteudo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Conteudo" ADD CONSTRAINT "Conteudo_id_etapa_fkey" FOREIGN KEY ("id_etapa") REFERENCES "etapa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
