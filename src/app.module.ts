import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';
import { RolesGuard } from './auth/guards/Roles.guard';
import { AuthModule } from './auth/auth.module';
import { ProfessorModule } from './professor/professor.module';
import { WorkService } from './work/work.service';
import { WorkModule } from './work/work.module';
import { StepModule } from './step/step.module';
import { PeriodusService } from './periodus/periodus.service';
import { PeriodusModule } from './periodus/periodus.module';
import { StudentClassModule } from './student-class/student-class.module';
import { ProofModule } from './proof/proof.module';
import { DisciplineModule } from './discipline/discipline.module';
import { ConfigModule } from '@nestjs/config';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ProfessorModule,
    WorkModule,
    StepModule,
    PeriodusModule,
    StudentClassModule,
    ContentModule,
    ProofModule,
    DisciplineModule,
  ],
  controllers: [],
  providers: [
    WorkService,
    PeriodusService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
