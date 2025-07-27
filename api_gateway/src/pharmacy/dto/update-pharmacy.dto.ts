import { PartialType } from '@nestjs/mapped-types';
import { CreatePharmacyDto } from '@/pharmacy/dto/create-pharmacy.dto';

export class UpdatePharmacyDto extends PartialType(CreatePharmacyDto) {}
