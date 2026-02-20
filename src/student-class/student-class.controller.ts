import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/RoleEnum';
import { CreateLink, CreateStudentClassDto, ResponseLink } from './dto/strudent-classDTO';
import { StudentClassService } from './student-class.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { Payload } from 'src/types/TokenJwtPayload';

@Controller('student-class')
export class StudentClassController {
  constructor(private studentClassService: StudentClassService) { }

  @Roles(Role.TEACHER)
  @Get(':idClass/students')
  public async listStudentClasses(@Param('idClass') idClass:string) {
    return await this.studentClassService.listStudentClasses(idClass);
  }

  @Roles(Role.TEACHER)
  @Get(':idClass/stages')
  public async getStepsByClassId(@Param('idClass') idClass:string){
      const result = await this.studentClassService.getStepsByClassId(idClass);
      return result;
  }

  @Roles(Role.TEACHER)
  @Post('')
  public async createStudentClass(@Body() body: CreateStudentClassDto, @CurrentUser() user: Payload): Promise<CreateStudentClassDto> {
    return await this.studentClassService.createStudentClass(body,user.id);
  }

  @Roles(Role.TEACHER)
  @Post('/generate-access-class-link')
  public async createClassLink(@Body() body: CreateLink): Promise<ResponseLink> {

    const accessUrl = await this.studentClassService.createClassLink(body);
    
    const responseLink:ResponseLink = {
      link: accessUrl
    }
    return responseLink;
  }
}
