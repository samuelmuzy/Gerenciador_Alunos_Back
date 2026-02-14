import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentClassDto } from './dto/strudent-classDTO';
import { JwtService } from '@nestjs/jwt';
import { PayloadLinkClass } from 'src/types/TokenJwtPayload';

@Injectable()
export class StudentClassService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService,) { }

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

  public async createClassLink(id: string): Promise<String> {

    const verifyClassExist = await this.prismaService.turma.findUnique({
      where: {
        id: id,
      }
    });

    if(!verifyClassExist){
        throw new NotFoundException('Classe não encontrada');
    }

    const payload: PayloadLinkClass = {
      classId: id,
      professorId:'1',
      type:'invite'
    }

    const accessToken = await this.jwtService.signAsync(payload);


    return accessToken;
  }
}
