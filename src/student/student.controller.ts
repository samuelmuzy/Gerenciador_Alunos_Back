import { Controller, Get, Param } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/RoleEnum';
import { ClassResponseDto } from 'src/student-class/dto/strudent-classDTO';
import { StudentService } from './student.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { type Payload } from 'src/types/TokenJwtPayload';
import { EtapaResponseDto } from 'src/step/dto/StepDTO';

@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService) { }

    @Roles(Role.STUDENT)
    @Get('/classes')
    public async getAllClassesByStudentId(@CurrentUser() user: Payload): Promise<ClassResponseDto[]> {
        
        return await this.studentService.getAllClassesByStudentId(user.id);
    }

    @Roles(Role.STUDENT)
    @Get('/student-class/:id_class/contents')
    public async getStudentClassAndContentsByIdClass(@Param('id_class') id_class: string, @CurrentUser() user: Payload): Promise<ClassResponseDto> {
        return await this.studentService.getStudentClassAndContentsByIdClass(id_class, user.id);
    }
    

}
