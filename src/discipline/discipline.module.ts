import { Module } from '@nestjs/common';
import { DisciplineService } from './discipline.service';
import { DisciplineController } from './discipline.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guards/Roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  providers: [DisciplineService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard  ,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },],
  controllers: [DisciplineController]
})
export class DisciplineModule {}
