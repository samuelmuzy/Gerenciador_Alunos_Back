import { IsNotEmpty } from 'class-validator';

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
      data_inicio: Date;
      data_fim: Date;
      nota_maxima_etapa: number;
      id_periodo: string;
      provas: {
        id: string;
        nome: string;
        valor: number;
        id_etapa: string;
      }[]
      trabalhos: {
        id: string;
        nome: string;
        valor: number;
        id_etapa: string;
      }[]
    }[];
  };
}