import { IsNotEmpty } from "class-validator"

export class CreateStudentClassDto {
   
  @IsNotEmpty()
  nome: string

  @IsNotEmpty()
  id_periodo:string
  
}