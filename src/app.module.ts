import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProfessorModule } from './professor/professor.module';
import { WorkService } from './work/work.service';
import { WorkModule } from './work/work.module';
import { StepModule } from './step/step.module';
import { PeriodusService } from './periodus/periodus.service';
import { PeriodusModule } from './periodus/periodus.module';
import { StudentClassModule } from './student-class/student-class.module';
import { ProofModule } from './proof/proof.module';
import { DisciplineModule } from './discipline/discipline.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    AuthModule,
    ProfessorModule,
    WorkModule,
    StepModule,
    PeriodusModule,
    StudentClassModule,
    ProofModule,
    DisciplineModule
  ],
  controllers: [],
  providers: [WorkService, PeriodusService],
})
export class AppModule { }
