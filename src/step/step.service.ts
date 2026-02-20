import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStepDto } from './dto/StepDTO';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StepService {
  constructor(private prismaService: PrismaService) { }

  public async createStep(data: CreateStepDto[]): Promise<CreateStepDto[]> {
    data.forEach(async (element) => {
      const verifyPeriodusIdExist = await this.prismaService.periodo.findUnique({
        where: { id: element.id_periodo },
      });

      if (!verifyPeriodusIdExist) {
        throw new NotFoundException(
          `Etapa com ID ${element.id_periodo} não encontrada.`,
        );
      }

    })

    const newStep = await this.prismaService.etapa.createManyAndReturn({ data });

    return newStep;
  }
}
