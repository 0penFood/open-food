import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreatePartnershipSocietysDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  sponsorSociety: string;

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
