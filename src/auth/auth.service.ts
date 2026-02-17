import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { SingInDTO, SingUpDTO } from './dtos/authDTO';
import { PrismaService } from 'src/prisma/prisma.service';
import { comparePassword, hashPassword } from 'src/common/utils/hash';
import { JwtService } from '@nestjs/jwt';
import { Role } from './enums/RoleEnum';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  public async singUp(data: SingUpDTO, response: Response): Promise<object> {
    const verifyUserAlreadExist = await this.prismaService.usuario.findUnique({
      where: { email: data.email },
    });

    if (verifyUserAlreadExist) {
      throw new UnauthorizedException('Usuário já existe');
    }

    const hashedPassword = hashPassword(data.senha);

    data.senha = await hashedPassword;

    const newUser = await this.prismaService.usuario.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        cpf: data.cpf,
        role: Role.STUDENT,
        aluno: {
          create: {
            matricula: data.matricula,
          },
        },
      },
      include: {
        aluno: true,
      },
    });
    const payload = { id:newUser.id,nome: data.nome, email: data.email, roles: [Role.ADMIN] };

    const accessToken = await this.jwtService.signAsync(payload);

    const isProd = process.env.NODE_ENV === 'production';

    response.cookie('token', accessToken, {
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      path: '/',
    });

    return { message: 'Usuário logado com sucesso', user: newUser };
  }

  public async singIn(data: SingInDTO, response: Response) {
    const verifyUserExist = await this.prismaService.usuario.findUnique({
      where: { email: data.email },
    });

    if (!verifyUserExist) {
      throw new UnauthorizedException('Erro ao efetuar o login');
    }

    const hashedPassword = await comparePassword(
      data.senha,
      verifyUserExist.senha,
    );

    if (!hashedPassword) {
      throw new UnauthorizedException('Erro ao efetuar o login');
    }

    const payload = {
      id: verifyUserExist.id,
      nome: verifyUserExist.nome,
      email: data.email,
      role: verifyUserExist.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    const isProd = process.env.NODE_ENV === 'production';

    response.cookie('token', accessToken, {
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      path: '/',
    });

    return { message: 'Usuário logado com sucesso', user: verifyUserExist };
  }

  public async singInProfessor(data: SingInDTO, response: Response) {
    const verifyUserExist = await this.prismaService.usuario.findUnique({
      where: { email: data.email },
    });

    if (!verifyUserExist) {
      throw new UnauthorizedException('Erro ao efetuar o login');
    }

    if (verifyUserExist.role !== Role.TEACHER) {
      throw new ForbiddenException('Não autorizado');
    }

    const hashedPassword = await comparePassword(
      data.senha,
      verifyUserExist.senha,
    );

    if (!hashedPassword) {
      throw new UnauthorizedException('Erro ao efetuar o login');
    }

    const payload = {
      id:verifyUserExist.id,
      nome: verifyUserExist.nome,
      email: data.email,
      role: verifyUserExist.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    const isProd = process.env.NODE_ENV === 'production';

    response.cookie('token', accessToken, {
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      path: '/',
    });

    return { message: 'Usuário logado com sucesso', user: verifyUserExist };
  }
}
