import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentClassDto } from './dto/strudent-classDTO';

@Injectable()
export class StudentClassService {
  constructor(private prismaService: PrismaService) {}

  public async listStudentClasses() {
    return this.prismaService.turma.findMany({
      orderBy: { nome: 'asc' },
      include: { periodo: true },
    });
  }

  public async createStudentClass(
    data: CreateStudentClassDto,
  ): Promise<CreateStudentClassDto> {
    const newTurma = await this.prismaService.turma.create({ data });
    return newTurma;
  }
}
