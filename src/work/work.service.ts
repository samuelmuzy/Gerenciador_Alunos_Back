import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWork, CreateWorkStudent, TeacherSubmissionItemDto, UpdateWorkSubmissionGradeDto, WorkResponseDto, WorkSubmissionGradeResponseDto } from './dto/WorkDTO';
import { plainToInstance } from 'class-transformer';
import { uploadImagemBuffer } from 'src/common/utils/UploadImage';

@Injectable()
export class WorkService {
  constructor(private prismaService: PrismaService) { }

  public async createWork(data: CreateWork): Promise<CreateWork> {
    const verifyStepIdExist = await this.prismaService.etapa.findUnique({
      where: { id: data.id_etapa },
    });

    if (!verifyStepIdExist) {
      throw new NotFoundException(
        `Etapa com ID ${data.id_etapa} não encontrada.`,
      );
    }

    const newWork = await this.prismaService.trabalho.create({ data });
    return newWork;
  }

  public async submitWorkStudent(userId: string, data: CreateWorkStudent, file: Express.Multer.File) {
    const buffer: Buffer = file?.buffer;

    const studentExist = await this.prismaService.aluno.findUnique({
      where: {
        id_usuario: userId
      }
    });

    if (!studentExist) {
      throw new BadRequestException("Usuário não encontrado");
    }

    const workExist = await this.prismaService.trabalho.findUnique({
      where: { id: data.trabalho_id }
    })

    if(!workExist){
        throw new BadRequestException("Trabalho não encontrado");
    }

    if (!file) {
      throw new BadRequestException('File não informado');
    }

    const { url, publicId } = await uploadImagemBuffer(buffer, 'Trabalhos');


    const newContent = await this.prismaService.alunoTrabalho.create({
      data: {
        data_envio: data.data_envio,
        url: url,
        public_id: publicId,
        alunos_id: studentExist.id,
        trabalho_id: data.trabalho_id,
      }
    });

    return newContent;

  }

  public async getWorkById(id: string, userId: string): Promise<WorkResponseDto> {

    const work = await this.prismaService.trabalho.findUnique({
      where: {
        id: id
      },
      select: {
        alunoTrabalhos: true,
        etapa: true,
        nome: true,
        data_fim: true,
        data_inicio: true,
        id: true,
        valor: true
      }
    });

    if (!work) {
      throw new NotFoundException('Trabalho não encontrado');
    }

    const studentExist = await this.prismaService.aluno.findUnique({
      where: {
        id_usuario: userId,
      },
      select: {
        id: true,
      },
    });

    let jaSubmeteu = false;
    let submissao: WorkResponseDto['submissao'] = null;

    if (studentExist) {
      const submissionExist = await this.prismaService.alunoTrabalho.findUnique({
        where: {
          alunos_id_trabalho_id: {
            alunos_id: studentExist.id,
            trabalho_id: id,
          },
        },
        select: {
          trabalho_id: true,
          public_id: true,
          data_envio: true,
          url: true,
        },
      });

      jaSubmeteu = Boolean(submissionExist);

      if (submissionExist) {
        submissao = {
          id: submissionExist.trabalho_id,
          url_documento: submissionExist.url,
          public_id: submissionExist.public_id,
          criado_em: submissionExist.data_envio,
          status: 'enviado',
        };
      }
    }

    const workWithSubmission = {
      ...work,
      ja_submeteu: jaSubmeteu,
      mensagem_submissao: jaSubmeteu ? 'Trabalho enviado' : 'Trabalho ainda não enviado',
      submissao,
    };

    return plainToInstance(WorkResponseDto, workWithSubmission, {
      excludeExtraneousValues: true,
    });

  }

  public async listClassSubmissions(
    idClass: string,
    teacherUserId: string,
  ): Promise<TeacherSubmissionItemDto[]> {
    const teacher = await this.prismaService.professor.findUnique({
      where: { id_usuario: teacherUserId },
      select: { id: true },
    });

    if (!teacher) {
      throw new NotFoundException('Professor não encontrado');
    }

    const teacherHasClass = await this.prismaService.professoresTurmas.findUnique({
      where: {
        professores_id_turmas_id: {
          professores_id: teacher.id,
          turmas_id: idClass,
        },
      },
    });

    if (!teacherHasClass) {
      throw new BadRequestException('Turma não vinculada ao professor');
    }

    const submissions = await this.prismaService.alunoTrabalho.findMany({
      where: {
        alunos: {
          alunosTurmas: {
            some: {
              turmas_id: idClass,
            },
          },
        },
      },
      orderBy: {
        data_envio: 'desc',
      },
      select: {
        alunos_id: true,
        trabalho_id: true,
        url: true,
        public_id: true,
        data_envio: true,
        nota: true,
        alunos: {
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
        trabalho: {
          select: {
            id: true,
            nome: true,
            valor: true,
            etapa: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
        },
      },
    });

    const response = submissions.map((item) => ({
      students_id: item.alunos_id,
      work_id: item.trabalho_id,
      file_url: item.url,
      public_id: item.public_id,
      submitted_at: item.data_envio,
      grade: item.nota,
      student: {
        id: item.alunos.id,
        matricula: item.alunos.matricula,
        nome: item.alunos.usuario.nome,
        email: item.alunos.usuario.email,
      },
      work: {
        id: item.trabalho.id,
        nome: item.trabalho.nome,
        valor: item.trabalho.valor,
      },
      step: {
        id: item.trabalho.etapa.id,
        nome: item.trabalho.etapa.nome,
      },
    }));

    return plainToInstance(TeacherSubmissionItemDto, response, {
      excludeExtraneousValues: true,
    });
  }

  public async listStudentSubmissions(
    idClass: string,
    teacherUserId: string,
    studentId:string
  ): Promise<TeacherSubmissionItemDto[]> {

    const teacher = await this.prismaService.professor.findUnique({
      where: { id_usuario: teacherUserId },
      select: { id: true },
    });

    if (!teacher) {
      throw new NotFoundException('Professor não encontrado');
    }

    const teacherHasClass = await this.prismaService.professoresTurmas.findUnique({
      where: {
        professores_id_turmas_id: {
          professores_id: teacher.id,
          turmas_id: idClass,
        },
      },
    });

    if (!teacherHasClass) {
      throw new BadRequestException('Turma não vinculada ao professor');
    }

    const submissions = await this.prismaService.alunoTrabalho.findMany({
      where: {
        alunos: {
          alunosTurmas: {
            some: {
              turmas_id: idClass,
              alunos_id:studentId
            },
          },
        },
      },
      orderBy: {
        data_envio: 'desc',
      },
      select: {
        alunos_id: true,
        trabalho_id: true,
        url: true,
        public_id: true,
        data_envio: true,
        nota: true,
        corrigido:true,
        alunos: {
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
        trabalho: {
          select: {
            id: true,
            nome: true,
            valor: true,
            etapa: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
        },
      },
    });

    const response = submissions.map((item) => ({
      students_id: item.alunos_id,
      work_id: item.trabalho_id,
      file_url: item.url,
      public_id: item.public_id,
      submitted_at: item.data_envio,
      grade: item.nota,
      is_graded:item.corrigido,
      student: {
        id: item.alunos.id,
        matricula: item.alunos.matricula,
        nome: item.alunos.usuario.nome,
        email: item.alunos.usuario.email,
      },
      work: {
        id: item.trabalho.id,
        nome: item.trabalho.nome,
        valor: item.trabalho.valor,
      },
      step: {
        id: item.trabalho.etapa.id,
        nome: item.trabalho.etapa.nome,
      },
    }));

    return plainToInstance(TeacherSubmissionItemDto, response, {
      excludeExtraneousValues: true,
    });
  }

  public async updateWorkSubmissionGrade(
    data: UpdateWorkSubmissionGradeDto,
    teacherUserId: string,
  ): Promise<WorkSubmissionGradeResponseDto> {
    const teacher = await this.prismaService.professor.findUnique({
      where: { id_usuario: teacherUserId },
      select: { id: true },
    });

    if (!teacher) {
      throw new NotFoundException('Professor não encontrado');
    }

    const submission = await this.prismaService.alunoTrabalho.findUnique({
      where: {
        alunos_id_trabalho_id: {
          alunos_id: data.students_id,
          trabalho_id: data.work_id,
        },
      },
      select: {
        alunos_id: true,
        trabalho_id: true,
        trabalho: {
          select: {
            etapa: {
              select: {
                periodo: {
                  select: {
                    turmas: {
                      select: {
                        id: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!submission) {
      throw new NotFoundException('Submissão não encontrada');
    }

    const classIds = submission.trabalho.etapa.periodo.turmas.map((classItem) => classItem.id);

    const teacherClassLink = await this.prismaService.professoresTurmas.findFirst({
      where: {
        professores_id: teacher.id,
        turmas_id: { in: classIds },
      },
      select: {
        turmas_id: true,
      },
    });

    if (!teacherClassLink) {
      throw new BadRequestException('Professor sem permissão para avaliar esta submissão');
    }

    const updatedSubmission = await this.prismaService.alunoTrabalho.update({
      where: {
        alunos_id_trabalho_id: {
          alunos_id: data.students_id,
          trabalho_id: data.work_id,
        },
      },
      data: {
        nota: data.grade,
      },
      select: {
        alunos_id: true,
        trabalho_id: true,
        nota: true,
      },
    });

    return plainToInstance(
      WorkSubmissionGradeResponseDto,
      {
        students_id: updatedSubmission.alunos_id,
        work_id: updatedSubmission.trabalho_id,
        grade: updatedSubmission.nota,
      },
      { excludeExtraneousValues: true },
    );
  }
}
