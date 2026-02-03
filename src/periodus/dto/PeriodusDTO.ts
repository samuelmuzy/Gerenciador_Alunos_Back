import { IsDateString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePeriodus {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  descricao: string;

  @IsNotEmpty()
  @IsNumber()
  nota_corte: number;

  @IsNotEmpty()
  @IsDateString()
  data_inicio: string;

  @IsNotEmpty()
  @IsDateString()
  data_fim: string;

  /** Preenchido apenas pelo backend ao criar; não enviar no POST de criação. */
  @IsOptional()
  id_periodo_regular?: string;
}
