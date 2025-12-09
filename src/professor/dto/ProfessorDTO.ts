import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateProfessorDto {
  // Dados do usuário
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  senha: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  // Dados específicos do professor
  @IsNotEmpty()
  @IsString()
  formacao: string;

  @IsOptional()
  @IsString()
  area: string;
}
