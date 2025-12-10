import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWork } from './dto/WorkDTO';

@Injectable()
export class WorkService {
    constructor(private prismaService: PrismaService) { }

    public async createWork(data: CreateWork): Promise<CreateWork> {
        const verifyStepIdExist = await this.prismaService.etapa.findUnique({ where: { id: data.id_etapa } })

        if (!verifyStepIdExist) {
            throw new NotFoundException(`Etapa com ID ${data.id_etapa} não encontrada.`);
        }
        
        const newWork = await this.prismaService.trabalho.create({ data });
        return newWork;
    }
}
