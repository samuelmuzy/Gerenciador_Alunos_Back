import { Module } from '@nestjs/common';
import { StepService } from './step.service';
import { StepController } from './step.controller';


@Module({
  providers: [StepService],
  controllers: [StepController],
})
export class StepModule {}
