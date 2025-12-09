-- CreateTable
CREATE TABLE "aluno_trabalho" (
    "alunos_id" TEXT NOT NULL,
    "trabalho_id" TEXT NOT NULL,
    "nota" DOUBLE PRECISION NOT NULL,
    "data_envio" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "aluno_trabalho_pkey" PRIMARY KEY ("alunos_id","trabalho_id")
);

-- CreateTable
CREATE TABLE "alunos_provas" (
    "alunos_id" TEXT NOT NULL,
    "provas_id" TEXT NOT NULL,
    "nota" DOUBLE PRECISION NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alunos_provas_pkey" PRIMARY KEY ("alunos_id","provas_id")
);

-- AddForeignKey
ALTER TABLE "aluno_trabalho" ADD CONSTRAINT "aluno_trabalho_alunos_id_fkey" FOREIGN KEY ("alunos_id") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aluno_trabalho" ADD CONSTRAINT "aluno_trabalho_trabalho_id_fkey" FOREIGN KEY ("trabalho_id") REFERENCES "trabalho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alunos_provas" ADD CONSTRAINT "alunos_provas_alunos_id_fkey" FOREIGN KEY ("alunos_id") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alunos_provas" ADD CONSTRAINT "alunos_provas_provas_id_fkey" FOREIGN KEY ("provas_id") REFERENCES "provas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
