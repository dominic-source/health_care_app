import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from '@/appointment/dto/create-appointment.dto';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {}
