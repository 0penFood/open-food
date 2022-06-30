import { PartialType } from '@nestjs/swagger';
import { CreatePartnershipSocietysDto } from './create-partnership-societys.dto';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdatePartnershipSocietysDto extends PartialType(CreatePartnershipSocietysDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  sponsorSociety: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  partnerSociety: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  isValid: boolean;
}
