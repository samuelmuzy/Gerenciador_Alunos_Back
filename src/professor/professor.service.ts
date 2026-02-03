import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateProfessorDto } from './dto/ProfessorDTO';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'src/common/utils/hash';
import { Role } from 'src/auth/enums/RoleEnum';

@Injectable()
export class ProfessorService {
  constructor(private prismaService: PrismaService) { }

  public async createProfessor(data: CreateProfessorDto) {
    const verifyEmailExist = await this.prismaService.usuario.findUnique({ where: { email: data.email }});

    if(verifyEmailExist){
      throw new UnauthorizedException('Email já existe');
    }

    const hashedPassword = await hashPassword(data.senha);

    const newProfessor = await this.prismaService.usuario.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: hashedPassword,
        cpf: data.cpf,
        role: Role.TEACHER,
        professor: {
          create: {
            graduacao: data.formacao,
            tipo: data.area,
          },
        },
      },
      include: {
        professor: true,
      },
    });

    return newProfessor;
  }

  public async getProfessorById(id: string) {
    const professor = await this.prismaService.usuario.findUnique({
      where: {
        id: id,
      },
      include: {
        professor: true,
      },
    });

    if (!professor) {
      throw new NotFoundException('Professor não encontrado');
    }

    return professor;
  }
}
