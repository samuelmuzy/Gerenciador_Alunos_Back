import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLink, CreateStudentClassDto, ResponseClassAndStudent, ResponseStepAndClassDto, ValidateLink } from './dto/strudent-classDTO';
import { randomBytes } from 'node:crypto';
import { hashPassword, hashTokenInvite } from 'src/common/utils/hash';

@Injectable()
export class StudentClassService {
  constructor(private prismaService: PrismaService) { }

  public async listAllClasses() {
    const classes = await this.prismaService.turma.findMany({
      orderBy: { nome: 'asc' },
      include: { periodo: true },
    });

    return classes;
  }


  public async listStudentAndClasse(idClass: string): Promise<ResponseClassAndStudent | null> {

    const turmaExist = await this.prismaService.turma.findUnique({ where: { id: idClass } });

    if (!turmaExist) {
      throw new NotFoundException(
        `Turma com ID ${idClass} não encontrada.`,
      );
    }

    const classes = await this.prismaService.turma.findUnique({
      where: { id: idClass },
      include: {
        alunos: {
          select: {
            id: true,
            matricula: true,
            usuario: {
              select: {
                nome: true,
                email: true
              }
            }
          }
        }
      }
    });

    return classes;
  }

  public async getStepsByClassId(idClass: string): Promise<ResponseStepAndClassDto | null> {

    const turmaExist = await this.prismaService.turma.findUnique({ where: { id: idClass } });

    if (!turmaExist) {
      throw new NotFoundException(
        `Turma com ID ${idClass} não encontrada.`,
      );
    }

    const steps = await this.prismaService.turma.findUnique({
      where: {
        id: idClass
      },
      include: {
        periodo: {
          include: {
            etapas: {
              include: {
                provas: true,
                trabalhos: true
              }
            }
          }
        }
      }
    });

    return steps;

  }

  public async createStudentClass(data: CreateStudentClassDto, idProfessor: string): Promise<CreateStudentClassDto> {

    const verifyProfessorExist = await this.prismaService.professor.findUnique({
      where:{
         id_usuario:idProfessor
      }
    });

    if(!verifyProfessorExist){
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

  public async validateClassLink(body: ValidateLink,idUser:string) {

    const verifyStudentExist = await this.prismaService.aluno.findUnique({
      where:{
         id_usuario:idUser
      }
    })

    if(!verifyStudentExist){
      throw new NotFoundException('Aluno não encontrado');
    }

    const dateNow = new Date(Date.now());

    const hashToken = hashTokenInvite(body.token);

    const validateInvite = await this.prismaService.turmaConvite.findUnique({
      where:{
        tokenHash:hashToken
      }
    });

    if(!validateInvite){
      throw new UnauthorizedException("Link invalido");
    }

    if (validateInvite.espira < dateNow || !validateInvite.ativo) {
      throw new UnauthorizedException('O convite expirou ou está inativo');
    }

    const student = await this.prismaService.aluno.update({
      data:{
         id_turma:validateInvite.turma_id
      },
      where:{
        id_usuario:idUser
      }
    })
    
    return student;
  }
}
