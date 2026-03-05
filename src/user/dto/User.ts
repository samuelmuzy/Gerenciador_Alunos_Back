import { Expose, Type } from "class-transformer";
import { ProvaResponseDto } from "src/proof/dto/ProofDTO";
import { StudentResponseDto } from "src/student/dto/StudentDto";

export class UserResponseDto {
    @Expose()
    id: string;
    
    @Expose()
    nome: string;
    
    @Expose()
    email: string;

    senha: string;
    
    @Expose()
    role: string;
    
    @Expose()
    cpf: string;

    @Expose()
    @Type(() => StudentResponseDto)
    aluno?:StudentResponseDto;

    @Expose()
    @Type(() => ProvaResponseDto)
    professor?: ProvaResponseDto;
}