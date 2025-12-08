import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { SingInDTO, SingUpDTO } from './dtos/authDTO';


import { Public } from './SkipAuth.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { comparePassword, hashPassword } from 'src/common/utils/hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private prismaService: PrismaService,private jwtService:JwtService) { }


    public async singUp(data: SingUpDTO):Promise<object> {
        const verifyUserAlreadExist = await this.prismaService.usuarios.findUnique({ where: { email: data.email } })
        
        if(verifyUserAlreadExist){
            throw new UnauthorizedException("Usuário já existe");
        }

        const hashedPassword = hashPassword(data.senha);

        data.senha = await hashedPassword;

        await this.prismaService.usuarios.create({ data });
        const payload = {nome:data.nome,email:data.email}

        const accessToken = await this.jwtService.signAsync({payload})
        return {token: accessToken};
    }

    public async singIn(data: SingInDTO) {
        const verifyUserExist = await this.prismaService.usuarios.findUnique({ where: { email: data.email } })
        
        if(!verifyUserExist){
            throw new UnauthorizedException("Erro ao efetuar o login");
        }

        const hashedPassword = comparePassword(data.senha,verifyUserExist.senha);

        if(!hashedPassword){
            throw new UnauthorizedException("Erro ao efetuar o login");
        }
 
        const payload = {nome:verifyUserExist.nome,email:data.email}

        const accessToken = await this.jwtService.signAsync({payload})
        return {token: accessToken};
    }
}
