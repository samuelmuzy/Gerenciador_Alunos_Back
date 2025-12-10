import { Module } from '@nestjs/common';
import { StudentClassService } from './student-class.service';
import { StudentClassController } from './student-class.controller';

@Module({
  providers: [StudentClassService],
  controllers: [StudentClassController]
})
export class StudentClassModule {}
