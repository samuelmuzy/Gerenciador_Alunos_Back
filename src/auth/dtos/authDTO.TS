import { IsEmail, IsNotEmpty, IsOptional, IsStrongPassword, MinLength } from "class-validator";

export class SingUpDTO {
    @IsNotEmpty()
    @MinLength(2)
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    senha: string;
    
    @IsOptional()
    cpf: string;
    
    @IsOptional()
    matricula: string;
    
    @IsOptional()
    id_turma: string;
}

export class SingInDTO {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    senha: string;
}