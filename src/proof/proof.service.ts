import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProofDto } from './dto/ProofDTO';

@Injectable()
export class ProofService {
    constructor(private prismaService: PrismaService) { }

    public async createProof(data: CreateProofDto): Promise<CreateProofDto> {
    
        const newProof = await this.prismaService.prova.create({ data });
        return newProof;
    }
}
