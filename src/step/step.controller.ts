import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/RoleEnum';
import { CreateStepDto } from './dto/StepDTO';
import { StepService } from './step.service';

@Controller('step')
export class StepController {
  constructor(private stepService: StepService) {}

  @Roles(Role.TEACHER)
  @Post('')
  public async createStep(@Body() body: CreateStepDto[]): Promise<CreateStepDto[]> {
    return await this.stepService.createStep(body);
  }
}
