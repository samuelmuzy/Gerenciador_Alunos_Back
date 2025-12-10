import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentClassDto } from './dto/strudent-classDTO';

@Injectable()
export class StudentClassService {
    constructor(private prismaService: PrismaService) { }

    public async createStudentClass(data: CreateStudentClassDto): Promise<CreateStudentClassDto> {
    
        const newPeriodus = await this.prismaService.turma.create({ data });
        return newPeriodus;
    }
}
