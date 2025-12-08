import { IsEmail, IsNotEmpty, IsStrongPassword, MinLength } from "class-validator";

export class SingUpDTO{
    @IsNotEmpty()
    @MinLength(2)
    nome:string;
    @IsEmail()
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    senha:string;
}
export class SingInDTO{ 
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    senha:string;
}