import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/RoleEnum';
import { CreateProfessorDto } from './dto/ProfessorDTO';
import { ProfessorService } from './professor.service';

@Controller('professor')
export class ProfessorController {

    constructor(private professorService:ProfessorService){}
    
    @Roles(Role.ADMIN)
    @Post("create-professor")
    async createProfessor(@Body() body:CreateProfessorDto){
        return await this.professorService.createProfessor(body);
    }
}
