import { Module } from '@nestjs/common';
import { ReportsService } from '@/reports/reports.service';
import { ReportsController } from '@/reports/reports.controller';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
