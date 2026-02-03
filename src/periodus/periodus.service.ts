import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePeriodus } from './dto/PeriodusDTO';

@Injectable()
export class PeriodusService {
  constructor(private prismaService: PrismaService) {}

  public async listPeriodus() {
    return this.prismaService.periodo.findMany({
      orderBy: { nome: 'asc' },
    });
  }

  public async createPeriodus(data: CreatePeriodus): Promise<CreatePeriodus> {
    const newPeriodus = await this.prismaService.periodo.create({ data });
    return newPeriodus;
  }
}
