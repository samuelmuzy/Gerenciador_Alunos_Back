import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/RoleEnum';
import { CreateLink, CreateStudentClassDto, ResponseLink } from './dto/strudent-classDTO';
import { StudentClassService } from './student-class.service';

@Controller('student-class')
export class StudentClassController {
  constructor(private studentClassService: StudentClassService) { }

  @Roles(Role.TEACHER)
  @Get('')
  public async listStudentClasses() {
    return await this.studentClassService.listStudentClasses();
  }

  @Roles(Role.TEACHER)
  @Post('')
  public async createStudentClass(
    @Body() body: CreateStudentClassDto,
  ): Promise<CreateStudentClassDto> {
    return await this.studentClassService.createStudentClass(body);
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
