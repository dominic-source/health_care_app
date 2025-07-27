import { Module } from '@nestjs/common';
import { AppointmentService } from '@/appointment/appointment.service';
import { AppointmentController } from '@/appointment/appointment.controller';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
