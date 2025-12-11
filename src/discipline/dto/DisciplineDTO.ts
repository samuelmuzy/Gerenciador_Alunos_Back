import { IsNotEmpty } from "class-validator"

export class createDisciplineDto{
    @IsNotEmpty()
    nome:string

    @IsNotEmpty()
    descricao:string

    @IsNotEmpty()
    id_periodo:string
    
}