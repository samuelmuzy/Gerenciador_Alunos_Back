import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { AlunoTrabalhoResponseDto } from 'src/student/dto/StudentDto';
import { EtapaResponseDto } from 'src/step/dto/StepDTO';

export class CreateWork {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  tipo: string;

  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @IsNotEmpty()
  data_inicio: Date;

  @IsNotEmpty()
  data_fim: Date;

  @IsNotEmpty()
  id_etapa: string;
}

export class CreateWorkStudent {
  @IsNotEmpty()
  trabalho_id: string;

  @IsOptional()
  @Transform(({ value }) =>
    value === undefined || value === '' ? 0 : Number(value),
  )
  @IsNumber()
  nota?: number;

  @IsNotEmpty()
  @Transform(({ value }) =>
    value instanceof Date ? value : new Date(String(value)),
  )
  data_envio: Date;
}

export class TeacherSubmissionStudentDto {
  @Expose()
  id: string;

  @Expose()
  matricula: string;

  @Expose()
  nome: string;

  @Expose()
  email: string;
}

export class TeacherSubmissionStepDto {
  @Expose()
  id: string;

  @Expose()
  nome: string;
}

export class TeacherSubmissionWorkDto {
  @Expose()
  id: string;

  @Expose()
  nome: string;

  @Expose()
  valor: number;
}

export class TeacherSubmissionItemDto {
  @Expose()
  students_id: string;

  @Expose()
  work_id: string;

  @Expose()
  file_url: string;

  @Expose()
  public_id: string;

  @Expose()
  submitted_at: Date;

  @Expose()
  grade: number;

  @Expose()
  is_graded:boolean;

  @Expose()
  @Type(() => TeacherSubmissionStudentDto)
  student: TeacherSubmissionStudentDto;

  @Expose()
  @Type(() => TeacherSubmissionWorkDto)
  work: TeacherSubmissionWorkDto;

  @Expose()
  @Type(() => TeacherSubmissionStepDto)
  step: TeacherSubmissionStepDto;
}

export class UpdateWorkSubmissionGradeDto {
  @IsString()
  @IsNotEmpty()
  students_id: string;

  @IsString()
  @IsNotEmpty()
  work_id: string;

  @IsNumber()
  grade: number;
}

export class WorkSubmissionGradeResponseDto {
  @Expose()
  students_id: string;

  @Expose()
  work_id: string;

  @Expose()
  grade: number;
}


export class WorkResponseDto {
  @Expose()
  id: string;

  @Expose()
  nome: string;

  @Expose()
  valor: number;

  @Expose()
  data_inicio:Date;

  @Expose()
  data_fim:Date

  @Expose()
  id_etapa: string;

  @Expose()
  @Type(() => AlunoTrabalhoResponseDto)
  alunoTrabalhos: AlunoTrabalhoResponseDto[];
  
  @Expose()
  @Type(() => EtapaResponseDto)
  etapa: EtapaResponseDto[];

  @Expose()
  ja_submeteu: boolean;

  @Expose()
  mensagem_submissao: string;

  @Expose()
  @Type(() => WorkSubmissionDto)
  submissao: WorkSubmissionDto | null;
}

export class WorkSubmissionDto {
  @Expose()
  id: string;

  @Expose()
  url_documento: string;

  @Expose()
  public_id: string;

  @Expose()
  criado_em: Date;

  @Expose()
  status: 'enviado';
}