import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePartnershipSocietysDto {
  @IsString()
  @IsNotEmpty()
  sponsorSociety: string;

  @IsString()
  @IsNotEmpty()
  partnerSociety: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isValid: boolean;
}
