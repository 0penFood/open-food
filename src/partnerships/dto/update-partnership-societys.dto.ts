import { PartialType } from '@nestjs/swagger';
import { CreatePartnershipSocietysDto } from './create-partnership-societys.dto';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdatePartnershipSocietysDto extends PartialType(CreatePartnershipSocietysDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  sponsorSociety: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  partnerSociety: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isValid: boolean;
}
