import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/RoleEnum';
import { CreateProfessorDto } from './dto/ProfessorDTO';
import { ProfessorService } from './professor.service';
import { Public } from 'src/auth/decorators/SkipAuth.decorator';

@Controller('professor')
export class ProfessorController {
  constructor(private professorService: ProfessorService) {}

  //@Roles(Role.ADMIN)
  @Public()
  @Post('create-professor')
  async createProfessor(@Body() body: CreateProfessorDto) {
    return await this.professorService.createProfessor(body);
  }

  @Roles(Role.TEACHER)
  @Get(':id')
  async getProfessorById(@Param('id') id: string) {
    return await this.professorService.getProfessorById(id);
  }
}
