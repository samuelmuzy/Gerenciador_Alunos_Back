-- CreateTable
CREATE TABLE "aluno_Turmas" (
    "alunos_id" TEXT NOT NULL,
    "turmas_id" TEXT NOT NULL,

    CONSTRAINT "aluno_Turmas_pkey" PRIMARY KEY ("alunos_id","turmas_id")
);

-- AddForeignKey
ALTER TABLE "aluno_Turmas" ADD CONSTRAINT "aluno_Turmas_alunos_id_fkey" FOREIGN KEY ("alunos_id") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aluno_Turmas" ADD CONSTRAINT "aluno_Turmas_turmas_id_fkey" FOREIGN KEY ("turmas_id") REFERENCES "turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
