import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import { EtapaResponseDto } from 'src/step/dto/StepDTO';
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
                turma: {
                    select: {
                        id: true,
                        nome: true,
                        id_periodo: true,
                        periodo: true
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

    public async getStudentClassAndContentsByIdClass(idClass: string, idUser: string):Promise<ClassResponseDto> {

        const now = new Date();
    
        const classData = await this.prismaService.turma.findFirst({
            where: {
                id: idClass,
                alunosTurmas: {
                    some: {
                        aluno: {
                            id_usuario: idUser
                        }
                    }
                }
            },
    
            select: {
                id: true,
                nome: true,
    
                periodo: {
                    select: {
                        etapas: {
                            select: {
                                id:true,
                                data_inicio:true,
                                data_fim:true,
                                nome:true,
                                nota_maxima_etapa:true,
                                id_periodo:true,
    
                                trabalhos: true,
    
                                conteudos: {
                                    where: {
                                        data_liberacao: { lte: now }
                                    },
                                    orderBy: {
                                        data_liberacao: "asc"
                                    }
                                }
    
                            }
                        }
                    }
                }
            }
        });
    
        if (!classData) {
            throw new NotFoundException("Aluno não pertence a esta turma");
        }
    
        return plainToInstance(ClassResponseDto, classData, {
            excludeExtraneousValues: true
        });
    }
}
