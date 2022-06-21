import { PartialType } from '@nestjs/swagger';
import { CreatePartnershipSocietysDto } from './create-partnership-societys.dto';
import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class UpdatePartnershipUsersDto extends PartialType(CreatePartnershipSocietysDto) {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  sponsorUser: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  partnerUser: number;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isValid: boolean;
}
