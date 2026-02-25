import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStepDto {

  @IsNotEmpty()
  nome:string;
  
  @IsNotEmpty()
  @IsDate()
  data_inicio: Date;

  @IsNotEmpty()
  @IsDate()
  data_fim: Date;

  @IsNumber()
  @IsNotEmpty()
  nota_maxima_etapa: number;

  @IsNotEmpty()
  id_periodo: string;
}

import { Expose, Type } from 'class-transformer';
import { ConteudoResponseDto } from 'src/content/dto/ContentDTO';
import { TrabalhoResponseDto } from 'src/work/dto/WorkDTO';
import { ProvaResponseDto } from 'src/proof/dto/ProofDTO';

export class EtapaResponseDto {
  @Expose()
  id: string;

  @Expose()
  nome: string;

  @Expose()
  data_inicio: Date;

  @Expose()
  data_fim: Date;

  @Expose()
  nota_maxima_etapa: number;

  @Expose()
  id_periodo: string;

  @Expose()
  @Type(() => ProvaResponseDto)
  provas: ProvaResponseDto[];

  @Expose()
  @Type(() => TrabalhoResponseDto)
  trabalhos: TrabalhoResponseDto[];

  @Expose()
  @Type(() => ConteudoResponseDto)
  conteudos: ConteudoResponseDto[];
}


