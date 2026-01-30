import { Injectable, NotFoundException } from '@nestjs/common';
import { createDisciplineDto } from './dto/DisciplineDTO';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DisciplineService {
  constructor(private prismaService: PrismaService) {}

  public async createProof(
    data: createDisciplineDto,
  ): Promise<createDisciplineDto> {
    
    const verifyStepIdExist = await this.prismaService.periodo.findUnique({
      where: { id: data.id_periodo },
    });

    if (!verifyStepIdExist) {
      throw new NotFoundException(
        `Periodo com ID ${data.id_periodo} não encontrada.`,
      );
    }

    const newDiscipline = await this.prismaService.materia.create({ data });
    return newDiscipline;
  }
}
