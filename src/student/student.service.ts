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

    public async getStudentClassAndContentsByIdClass(idClass: string) {
        const classExist = await this.prismaService.turma.findUnique({ where: { id: idClass }, select: { id_periodo: true }, });

        if (!classExist) {
            throw new NotFoundException(
                `Turma com ID ${idClass} não encontrada.`,
            );
        }

        const now = new Date(Date.now());

        const classes = await this.prismaService.etapa.findMany({
            where: {
                id_periodo: classExist.id_periodo,
            },
            select: {
                id: true,
                nome: true,
                data_inicio: true,
                data_fim: true,
                nota_maxima_etapa: true,

                trabalhos: {
                    select: {
                        id: true,
                        nome: true,
                        valor: true,
                    },
                },

                conteudos: {
                    where:{data_liberacao > now },
                    select: {
                        id: true,
                        nome: true,
                        data_liberacao: true,
                        descricao: true,
                        url_documento: true,
                        public_id: true
                    },
                },
            }
        });

    }
}
