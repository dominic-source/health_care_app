import { Module } from '@nestjs/common';
import { PharmacyService } from '@/pharmacy/pharmacy.service';
import { PharmacyController } from '@/pharmacy/pharmacy.controller';

@Module({
  controllers: [PharmacyController],
  providers: [PharmacyService],
})
export class PharmacyModule {}
