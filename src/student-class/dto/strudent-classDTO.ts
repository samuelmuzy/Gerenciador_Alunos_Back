import { IsNotEmpty, IsString } from 'class-validator';

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

export class ResponseStepAndClassDto {
  id_periodo: string;
  id: string;
  nome: string;

  periodo: {
    id: string;
    nome: string;
    descricao: string;
    nota_corte: number;
    id_periodo_regular: string | null;

    etapas: {
      id: string;
      nome: string;
      data_inicio: Date;
      data_fim: Date;
      nota_maxima_etapa: number;
      id_periodo: string;

      provas: {
        id: string;
        nome: string;
        valor: number;
        id_etapa: string;
      }[];

      trabalhos: {
        id: string;
        nome: string;
        valor: number;
        id_etapa: string;
      }[];

      conteudos: {
        id: string;
        nome: string;
        descricao: string;
        data_liberacao: Date;
        id_etapa: string;
      }[];

    }[];
  } | null;
}

import { Expose, Type } from 'class-transformer';
import { PeriodoResponseDto } from 'src/periodus/dto/PeriodusDTO';

export class TurmaResponseDto {
  @Expose()
  id: string;

  @Expose()
  nome: string;

  @Expose()
  id_periodo: string;

  @Expose()
  @Type(() => PeriodoResponseDto)
  periodo: PeriodoResponseDto;
}
