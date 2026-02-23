import { Module } from '@nestjs/common';
import { PeriodusController } from './periodus.controller';
import { PeriodusService } from './periodus.service';


@Module({
  controllers: [PeriodusController],
  providers: [PeriodusService],
})
export class PeriodusModule {}
