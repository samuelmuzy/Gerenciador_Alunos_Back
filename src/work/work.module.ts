import { Module } from '@nestjs/common';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guards/Roles.guard';

@Module({
  imports: [PrismaModule],
  providers: [WorkService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },],
  controllers: [WorkController],
})
export class WorkModule {}
