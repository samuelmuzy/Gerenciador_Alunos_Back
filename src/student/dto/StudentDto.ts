import { Expose, Type } from "class-transformer";
import { ClassResponseDto } from "src/student-class/dto/strudent-classDTO";
import { UserResponseDto } from "src/user/dto/User";
import { WorkResponseDto } from "src/work/dto/WorkDTO";
import { ProvaResponseDto } from "src/proof/dto/ProofDTO";
import { AlunosTurmas } from "./StudentAndClassesDto";

/** DTO da tabela de junção AlunoTrabalho (aluno_trabalho) */
export class AlunoTrabalhoResponseDto {
    @Expose()
    alunos_id: string;

    @Expose()
    trabalho_id: string;

    @Expose()
    public_id: string;

    @Expose()
    nota: number;

    @Expose()
    data_envio: Date;

    @Expose()
    url: string;

    @Expose()
    @Type(() => WorkResponseDto)
    trabalho: WorkResponseDto;
}

/** DTO da tabela de junção AlunosProvas (alunos_provas) */
export class AlunosProvasResponseDto {
    @Expose()
    alunos_id: string;

    @Expose()
    provas_id: string;

    @Expose()
    nota: number;

    @Expose()
    data: Date;

    @Expose()
    @Type(() => ProvaResponseDto)
    provas: ProvaResponseDto;
}

export class StudentResponseDto {
    @Expose()
    id: string;
    @Expose()
    matricula: string;

    // Relacionamentos
    @Expose()
    id_usuario: string;

    @Expose()
    @Type(() => UserResponseDto)
    usuario: UserResponseDto;


    @Expose()
    @Type(() => AlunosTurmas)
    alunosTurmas: AlunosTurmas


    @Expose()
    @Type(() => AlunoTrabalhoResponseDto)
    alunoTrabalhos: AlunoTrabalhoResponseDto[];

    @Expose()
    @Type(() => AlunosProvasResponseDto)
    alunosProvas: AlunosProvasResponseDto[];
}

