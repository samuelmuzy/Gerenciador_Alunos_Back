import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProfessorModule } from './professor/professor.module';
import { WorkService } from './work/work.service';
import { WorkModule } from './work/work.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    AuthModule,
    ProfessorModule,
    WorkModule
  ],
  controllers: [],
  providers: [WorkService],
})
export class AppModule { }
