import { PartialType } from '@nestjs/mapped-types';
import { CreateBillingDto } from '@/billing/dto/create-billing.dto';

export class UpdateBillingDto extends PartialType(CreateBillingDto) {}
