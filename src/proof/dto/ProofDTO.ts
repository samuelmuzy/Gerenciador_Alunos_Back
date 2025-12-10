import { IsNotEmpty, IsNumber } from "class-validator"
export class CreateProofDto {
    @IsNotEmpty()
    nome:string
    @IsNumber()
    @IsNotEmpty()
    valor:number
    @IsNotEmpty()
    id_etapa:string 
}