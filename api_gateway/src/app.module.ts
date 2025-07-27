import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { IdentityModule } from '@/identity/identity.module';
import { PatientModule } from '@/patient/patient.module';
import { AppointmentModule } from '@/appointment/appointment.module';
import { BillingModule } from '@/billing/billing.module';
import { ReportsModule } from '@/reports/reports.module';
import { PharmacyModule } from '@/pharmacy/pharmacy.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [IdentityModule, PatientModule, AppointmentModule, BillingModule, ReportsModule, PharmacyModule],
})
export class AppModule {}
