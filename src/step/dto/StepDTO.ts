import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStepDto {
  @IsNotEmpty()
  @IsDate()
  data_inicio: Date;

  @IsNotEmpty()
  @IsDate()
  data_fim: Date;

  @IsNotEmpty()
  nota_maxima_etapa: number;

  @IsNotEmpty()
  id_periodo: string;
}


