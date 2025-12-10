import { Module } from '@nestjs/common';
import { ProofService } from './proof.service';
import { ProofController } from './proof.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guards/Roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  providers: [ProofService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },],
  controllers: [ProofController]
})
export class ProofModule {}
