import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProofDto } from './dto/ProofDTO';

@Injectable()
export class ProofService {
    constructor(private prismaService: PrismaService) { }

    public async createProof(data: CreateProofDto): Promise<CreateProofDto> {

        const verifyStepIdExist = await this.prismaService.etapa.findUnique({ where: { id: data.id_etapa } })

        if (!verifyStepIdExist) {
            throw new NotFoundException(`Etapa com ID ${data.id_etapa} não encontrada.`);
        }
    
        const newProof = await this.prismaService.prova.create({ data });
        return newProof;
    }
}
