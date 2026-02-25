import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, MaxLength } from "class-validator"

export class createContent {
    @IsNotEmpty()
    @MaxLength(150)
    nome: string;

    @IsNotEmpty()
    @MaxLength(150)
    descricao: string;
    

    @IsNotEmpty()
    data_liberacao: Date;

    @IsNotEmpty()
    id_etapa:string
}

import { Expose } from 'class-transformer';

export class ConteudoResponseDto {
  @Expose()
  id: string;

  @Expose()
  nome: string;

  @Expose()
  descricao: string;

  @Expose()
  data_liberacao: Date;

  @Expose()
  url_documento:string
  
  @Expose()
  id_etapa: string;
}