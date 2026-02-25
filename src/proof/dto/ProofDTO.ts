import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateProofDto {
  @IsNotEmpty()
  nome: string;
  @IsNumber()
  @IsNotEmpty()
  valor: number;
  @IsNotEmpty()
  id_etapa: string;
}

import { Expose } from 'class-transformer';

export class ProvaResponseDto {
  @Expose()
  id: string;

  @Expose()
  nome: string;

  @Expose()
  valor: number;

  @Expose()
  id_etapa: string;
}