import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClassResponseDto, CreateLink, CreateStudentClassDto, ResponseClassAndStudent, ValidateLink } from './dto/strudent-classDTO';
import { randomBytes } from 'node:crypto';
import { hashPassword, hashTokenInvite } from 'src/common/utils/hash';
import { plainToInstance } from 'class-transformer';
import { EtapaResponseDto } from 'src/step/dto/StepDTO';

@Injectable()
export class StudentClassService {
  constructor(private prismaService: PrismaService) { }

  public async listAllClasses(userId: string) {
    const classes = await this.prismaService.turma.findMany({
      where: {
        professoresTurmas: {
          some: {
            professor: {
              id_usuario: userId
            }
          }
        }
      },
      include: {
        periodo: true,
      },
      orderBy: { nome: 'desc' },
    });
  
    return classes;
  }


  public async listStudentAndClasse(idClass: string): Promise<ClassResponseDto | null> {
    const turma = await this.prismaService.turma.findUnique({
      where: { id: idClass },
      include: {
        periodo: true,
        alunosTurmas: {
          include: {
            aluno: {
              select: {
                id: true,
                matricula: true,
                usuario: {
                  select: {
                    nome: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!turma) {
      throw new NotFoundException(
        `Turma com ID ${idClass} não encontrada.`,
      );
    }

    return plainToInstance(ClassResponseDto, turma, {
      excludeExtraneousValues: true,
    });
  }

  public async getStepsByClassId(idClass: string): Promise<EtapaResponseDto[] | null> {

    const classExist = await this.prismaService.turma.findUnique({ where: { id: idClass }, select: { id_periodo: true }, });

    if (!classExist) {
      throw new NotFoundException(
        `Turma com ID ${idClass} não encontrada.`,
      );
    }

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

        provas: {
          select: {
            id: true,
            nome: true,
            valor: true,
          },
        },

        trabalhos: {
          select: {
            id: true,
            nome: true,
            valor: true,
          },
        },

        conteudos: {
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

    return plainToInstance(EtapaResponseDto, classes, {
      excludeExtraneousValues: true,
    });
  }

  public async createStudentClass(data: CreateStudentClassDto, idProfessor: string): Promise<CreateStudentClassDto> {

    const verifyProfessorExist = await this.prismaService.professor.findUnique({
      where: {
        id_usuario: idProfessor
      }
    });

    if (!verifyProfessorExist) {
      throw new NotFoundException(
        `Professor com ID ${idProfessor} não encontrado.`,
      );
    }

    const newTurma = await this.prismaService.turma.create({ data });

    await this.prismaService.professoresTurmas.create({
      data: {
        professores_id: verifyProfessorExist?.id,
        turmas_id: newTurma.id
      }
    })

    return newTurma;
  }

  public async createClassLink(body: CreateLink): Promise<string> {

    const verifyClassExist = await this.prismaService.turma.findUnique({
      where: {
        id: body.idClass,
      }
    });

    if (!verifyClassExist) {
      throw new NotFoundException('Classe não encontrada');
    }

    const rawToken = randomBytes(32).toString('hex');

    const hashToken = hashTokenInvite(rawToken);

    const accessToken = await this.prismaService.turmaConvite.create({
      data: {
        criador_id: body.idProfessor,
        tokenHash: hashToken,
        espira: new Date(Date.now() + 1000 * 60 * 60 * 24),
        ativo: true,
        currentUses: 30,
        turma_id: body.idClass,
        datacriacao: new Date(),
        numero_usos: 100,
      }
    })

    const accessUrl = `${process.env.FRONT_URL}/invite/${rawToken}`;

    return accessUrl;
  }

  public async validateClassLink(body: ValidateLink, idUser: string) {

    const verifyStudentExist = await this.prismaService.aluno.findUnique({
      where: {
        id_usuario: idUser
      }
    })

    if (!verifyStudentExist) {
      throw new NotFoundException('Aluno não encontrado');
    }

    const dateNow = new Date(Date.now());

    const hashToken = hashTokenInvite(body.token);

    const validateInvite = await this.prismaService.turmaConvite.findUnique({
      where: {
        tokenHash: hashToken
      }
    });

    if (!validateInvite) {
      throw new UnauthorizedException("Link invalido");
    }

    if (validateInvite.espira < dateNow || !validateInvite.ativo) {
      throw new UnauthorizedException('O convite expirou ou está inativo');
    }

    const userAlreadyClass = await this.prismaService.alunosTurmas.findUnique({
      where: {
        alunos_id_turmas_id: {
          alunos_id: verifyStudentExist.id,
          turmas_id: validateInvite.turma_id
        }
      }
    });

    if (userAlreadyClass) {
      throw new ConflictException("Aluno já está nesta turma");
    }

    const student = await this.prismaService.alunosTurmas.create({
      data: {
        turmas_id: validateInvite.turma_id,
        alunos_id: verifyStudentExist.id
      },

    })

    return student;
  }
}
