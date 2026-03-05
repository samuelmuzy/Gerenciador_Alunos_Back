import { Expose, Type } from "class-transformer";
import { StudentResponseDto } from "./StudentDto";
import { ClassResponseDto } from "src/student-class/dto/strudent-classDTO";

export class AlunosTurmas {
    @Expose()
    alunos_id: string;

    @Expose()
    turmas_id: string;

    @Expose()
    @Type(() => StudentResponseDto)
    aluno: StudentResponseDto;

    @Expose()
    @Type(() => ClassResponseDto)
    turma: ClassResponseDto

}