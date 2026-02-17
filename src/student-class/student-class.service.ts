import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLink, CreateStudentClassDto } from './dto/strudent-classDTO';
import { JwtService } from '@nestjs/jwt';
import { PayloadLinkClass } from 'src/types/TokenJwtPayload';
import { randomBytes } from 'node:crypto';
import { hashPassword } from 'src/common/utils/hash';

@Injectable()
export class StudentClassService {
  constructor(private prismaService: PrismaService) { }

  public async listStudentClasses() {
    const classes = await this.prismaService.turma.findMany({
      orderBy: { nome: 'asc' },
      include: { periodo: true },
    });

    return classes;
  }

  public async createStudentClass(
    data: CreateStudentClassDto,
  ): Promise<CreateStudentClassDto> {
    const newTurma = await this.prismaService.turma.create({ data });
    return newTurma;
  }

  public async createClassLink(body:CreateLink): Promise<string> {

    const verifyClassExist = await this.prismaService.turma.findUnique({
      where: {
        id: body.idClass,
      }
    });

    if(!verifyClassExist){
        throw new NotFoundException('Classe não encontrada');
    }

    const rawToken = randomBytes(32).toString('hex');

    const hashToken = await hashPassword(rawToken);

    const accessToken = await this.prismaService.turmaConvite.create({
      data:{
          criador_id:body.idProfessor,
          tokenHash:hashToken,
          espira:new Date(Date.now() + 1000 * 60 * 60 * 24),
          ativo:true,
          currentUses:30,
          turma_id:body.idClass,
          datacriacao:new Date(),
          numero_usos:100,
      }
    })
    
    const accessUrl = `${process.env.FRONT_URL}/token=${accessToken.tokenHash}`;
    
    return accessUrl;
  }
}
