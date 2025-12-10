import { IsDate, IsNegative, IsNotEmpty, IsNumber } from "class-validator"

export class CreateWork{
    @IsNotEmpty()
    nome:string

    @IsNotEmpty()
    tipo:string
    
    @IsNotEmpty()
    @IsNumber()
    @IsNegative()
    valor:number

    @IsNotEmpty()
    @IsDate()
    data_inicio:Date
    
    @IsNotEmpty()
    @IsDate()
    data_fim:Date

    @IsNotEmpty()
    id_etapa:string

}