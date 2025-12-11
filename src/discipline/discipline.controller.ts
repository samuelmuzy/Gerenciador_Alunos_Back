import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/RoleEnum';
import { createDisciplineDto } from './dto/DisciplineDTO';
import { DisciplineService } from './discipline.service';

@Controller('discipline')
export class DisciplineController {
    constructor(private disciplineService:DisciplineService){}
    
    @Roles(Role.ADMIN)
    @Post('')
    public async createProof(@Body() body:createDisciplineDto):Promise<createDisciplineDto>{
        return await this.disciplineService.createProof(body);
    }

}
