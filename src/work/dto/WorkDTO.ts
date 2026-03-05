import { IsDate, IsNegative, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWork {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  tipo: string;

  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @IsNotEmpty()
  data_inicio: Date;

  @IsNotEmpty()
  data_fim: Date;

  @IsNotEmpty()
  id_etapa: string;
}

import { Expose } from 'class-transformer';

export class TrabalhoResponseDto {
  @Expose()
  id: string;

  @Expose()
  nome: string;

  @Expose()
  valor: number;

  @Expose()
  id_etapa: string;
}