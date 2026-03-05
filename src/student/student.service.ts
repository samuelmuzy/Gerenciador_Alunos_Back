import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClassResponseDto } from 'src/student-class/dto/strudent-classDTO';

@Injectable()
export class StudentService {
    constructor(private prismaService: PrismaService) { }

    public async getAllClassesByStudentId(id_student: string): Promise<ClassResponseDto[]> {

        const studentExist = await this.prismaService.aluno.findUnique({
            where: { id_usuario: id_student }
        })

        if (!studentExist) {
            throw new NotFoundException("Aluno não encontrado");
        }

        const classes = await this.prismaService.alunosTurmas.findMany({
            where: {
                aluno: {
                    id_usuario: id_student
                }
            },
            select: {
                turma:{
                    select:{
                        id:true,
                        nome:true,
                        id_periodo:true,
                        periodo:true
                    }
                }
            }
        });
    
        return plainToInstance(
            ClassResponseDto,
            classes.map(c => c.turma),
            { excludeExtraneousValues: true }
        );
    }
}
