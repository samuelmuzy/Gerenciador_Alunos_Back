import { Body, Controller, Get, Post } from '@nestjs/common';
import { PeriodusService } from './periodus.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/RoleEnum';
import { CreatePeriodus } from './dto/PeriodusDTO';

@Controller('periodus')
export class PeriodusController {
  constructor(private periodusService: PeriodusService) {}

  @Roles(Role.TEACHER)
  @Get('')
  public async listPeriodus() {
    return await this.periodusService.listPeriodus();
  }

  @Roles(Role.TEACHER)
  @Post('')
  public async createPeriodus(
    @Body() body: CreatePeriodus,
  ): Promise<CreatePeriodus> {
    return await this.periodusService.createPeriodus(body);
  }
}
