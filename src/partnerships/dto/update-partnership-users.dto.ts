import { PartialType } from '@nestjs/swagger';
import { CreatePartnershipSocietysDto } from './create-partnership-societys.dto';
import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdatePartnershipUsersDto extends PartialType(CreatePartnershipSocietysDto) {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  sponsorUser: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  partnerUser: number;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  isValid: boolean;
}
