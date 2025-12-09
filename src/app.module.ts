import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProfessorModule } from './professor/professor.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    AuthModule,
    ProfessorModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
