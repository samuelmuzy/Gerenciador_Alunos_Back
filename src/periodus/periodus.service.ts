import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePeriodus } from './dto/PeriodusDTO';

@Injectable()
export class PeriodusService {
  constructor(private prismaService: PrismaService) { }

  public async listPeriodus() {
    return this.prismaService.periodo.findMany({
      orderBy: { nome: 'asc' },
    });
  }

  public async createPeriodus(data: CreatePeriodus) {
    const newPeriodusRegular = await this.prismaService.periodoRegular.create({
      data: {
        data_inicio: new Date(data.data_inicio),
        data_fim: new Date(data.data_fim),
      },
    });

    console.log(newPeriodusRegular)

    const newPeriodus = await this.prismaService.periodo.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        nota_corte: data.nota_corte,
        id_periodo_regular: newPeriodusRegular.id,
      },
    });

    return newPeriodus;
  }
}
