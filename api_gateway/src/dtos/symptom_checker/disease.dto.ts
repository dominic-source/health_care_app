import { IsString } from 'class-validator';

export class SymptomDto {
  @IsString()
  symptoms: string;
}
