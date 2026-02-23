import { IsDate, IsNotEmpty, MaxLength } from "class-validator"

export class createContent {
    @IsNotEmpty()
    @MaxLength(150)
    nome: string;

    @IsNotEmpty()
    @MaxLength(150)
    descricao: string;

    @IsNotEmpty()
    @IsDate()
    data_liberacao: Date;

    @IsNotEmpty()
    id_etapa:string
}