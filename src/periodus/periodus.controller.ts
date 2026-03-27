import { Body, Controller, Get, Post } from '@nestjs/common';
import { PeriodusService } from './periodus.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/RoleEnum';
import { CreatePeriodus } from './dto/PeriodusDTO';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { Payload } from 'src/types/TokenJwtPayload';

@Controller('periodus')
export class PeriodusController {
  constructor(private periodusService: PeriodusService) {}

  @Roles(Role.TEACHER)
  @Get('')
  public async listPeriodus(@CurrentUser() user:Payload) {
    return await this.periodusService.listPeriodus(user.id);
  }

  @Roles(Role.TEACHER)
  @Post('')
  public async createPeriodus(@Body() body: CreatePeriodus) {
    return await this.periodusService.createPeriodus(body);
  }
}
