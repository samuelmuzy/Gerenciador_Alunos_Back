import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import type { SingInDTO, SingUpDTO } from './dtos/authDTO';
import { PrismaService } from 'src/prisma/prisma.service';
import { comparePassword, hashPassword } from 'src/common/utils/hash';
import { JwtService } from '@nestjs/jwt';
import { Role } from './enums/RoleEnum';

@Injectable()
export class AuthService {

    constructor(private prismaService: PrismaService,private jwtService:JwtService) { }


    public async singUp(data: SingUpDTO):Promise<object> {
        const verifyUserAlreadExist = await this.prismaService.usuario.findUnique({ where: { email: data.email } })
        
        if(verifyUserAlreadExist){
            throw new UnauthorizedException("Usuário já existe");
        }

        const hashedPassword = hashPassword(data.senha);

        data.senha = await hashedPassword;

        const newUser = await this.prismaService.usuario.create({
            data: {
                nome:data.nome,
                email:data.email,
                senha: data.senha,
                cpf:data.cpf,
                role: Role.STUDENT,
                aluno: {
                  create: {
                    matricula:data.matricula
                  },
                },
              },
              include: {
                aluno: true,
              },
        })
        const payload = {nome:data.nome,email:data.email,roles: [Role.ADMIN] }

        const accessToken = await this.jwtService.signAsync(payload)
        return {token: accessToken,user:newUser};
    }

    public async singIn(data: SingInDTO) {
        const verifyUserExist = await this.prismaService.usuario.findUnique({ where: { email: data.email } })
        
        if(!verifyUserExist){
            throw new UnauthorizedException("Erro ao efetuar o login");
        }

        const hashedPassword = comparePassword(data.senha,verifyUserExist.senha);

        if(!hashedPassword){
            throw new UnauthorizedException("Erro ao efetuar o login");
        }
 
        const payload = {nome:verifyUserExist.nome,email:data.email,role:verifyUserExist.role}

        const accessToken = await this.jwtService.signAsync(payload)
        return {token: accessToken};
    }

    public async singInProfessor(data: SingInDTO) {
        const verifyUserExist = await this.prismaService.usuario.findUnique({ where: { email: data.email } })
        
        if(!verifyUserExist){
            throw new UnauthorizedException("Erro ao efetuar o login");
        }

        if(verifyUserExist.role != Role.TEACHER){
            throw new ForbiddenException("Não autorizado")
        }

        const hashedPassword = comparePassword(data.senha,verifyUserExist.senha);

        if(!hashedPassword){
            throw new UnauthorizedException("Erro ao efetuar o login");
        }
 
        const payload = {nome:verifyUserExist.nome,email:data.email,role:verifyUserExist.role}

        const accessToken = await this.jwtService.signAsync(payload)
        return {token: accessToken};
    }
}
