import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class CreatePartnershipUsersDto {

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  sponsorUser: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  partnerUser: number;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isValid: boolean;
}
