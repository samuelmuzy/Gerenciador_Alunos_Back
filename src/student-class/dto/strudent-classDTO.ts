import { IsNotEmpty } from 'class-validator';

export class CreateStudentClassDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  id_periodo: string;
}

export class CreateLink {
  @IsNotEmpty()
  idProfessor:string;
  @IsNotEmpty()
  idClass:string;
}

export class ResponseLink{
    link:string;
}
