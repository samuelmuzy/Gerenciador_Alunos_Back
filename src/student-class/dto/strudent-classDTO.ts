import { IsNotEmpty, IsString } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { PeriodoResponseDto } from 'src/periodus/dto/PeriodusDTO';
import { AlunosTurmas } from 'src/student/dto/StudentAndClassesDto';

export class CreateStudentClassDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  id_periodo: string;
}

export class CreateLink {
  @IsNotEmpty()
  idProfessor: string;
  @IsNotEmpty()
  idClass: string;
}

export class ResponseLink {
  link: string;
}

export class ValidateLink {
  @IsNotEmpty()
  @IsString()
  token: string
}

export class ResponseClassAndStudent {
  id: string;
  nome: string;
  id_periodo: string;
  alunos: {
    id: string
    matricula: string
    usuario: {
      nome: string;
      email: string
    }
  }[]
}


export class ClassResponseDto {
  @Expose()
  id: string;

  @Expose()
  nome: string;

  @Expose()
  id_periodo: string;

  @Expose()
  @Type(() => PeriodoResponseDto)
  periodo: PeriodoResponseDto;

  @Expose()
  @Type(() => AlunosTurmas)
  alunosTurmas: AlunosTurmas[];
}
