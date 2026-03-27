import { Body, Controller, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/RoleEnum';
import { CreateWork, CreateWorkStudent, TeacherSubmissionItemDto, UpdateWorkSubmissionGradeDto, WorkResponseDto, WorkSubmissionGradeResponseDto } from './dto/WorkDTO';
import { WorkService } from './work.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { Payload } from 'src/types/TokenJwtPayload';


@Controller('work')
export class WorkController {
  constructor(private workService: WorkService) { }

  @Roles(Role.TEACHER)
  @Post('')
  public async createWork(@Body() body: CreateWork): Promise<CreateWork> {
    return await this.workService.createWork(body);
  }

  @Roles(Role.TEACHER, Role.STUDENT)
  @Get('/:id')
  public async getWorkById(
    @Param('id') id: string,
    @CurrentUser() user: Payload,
  ): Promise<WorkResponseDto> {
    const work = await this.workService.getWorkById(id, user.id);
    
    return work;
  }


  @Roles(Role.STUDENT)
  @Post('/student')
  @UseInterceptors(FileInterceptor('file'))
  public async submitWorkStudent(
    @CurrentUser() user: Payload,
    @Body() body: CreateWorkStudent,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
        ],
      }),
    ) file: Express.Multer.File
  ): Promise<CreateWorkStudent> {
    return await this.workService.submitWorkStudent(user.id, body, file);
  }

  @Roles(Role.TEACHER)
  @Get('/class/:idClass/submissions')
  public async listClassSubmissions(
    @Param('idClass') idClass: string,
    @CurrentUser() user: Payload,
  ): Promise<TeacherSubmissionItemDto[]> {
    return await this.workService.listClassSubmissions(idClass, user.id);
  }

  @Roles(Role.TEACHER)
  @Get('/class/:idClass/student/:idStudent/submissions')
  public async listStudentSubmissions(
    @Param('idClass') idClass: string,
    @Param('idStudent') idStudent: string,
    @CurrentUser() user: Payload,
  ): Promise<TeacherSubmissionItemDto[]> {
    return await this.workService.listStudentSubmissions(idClass, user.id,idStudent);
  }

  @Roles(Role.TEACHER)
  @Patch('/student/grade')
  public async updateWorkSubmissionGrade(
    @Body() body: UpdateWorkSubmissionGradeDto,
    @CurrentUser() user: Payload,
  ): Promise<WorkSubmissionGradeResponseDto> {
    return await this.workService.updateWorkSubmissionGrade(body, user.id);
  }
}
