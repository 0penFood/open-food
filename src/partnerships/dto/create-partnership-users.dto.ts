import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class CreatePartnershipUsersDto {

  @Type(() => Number)
  @IsInt()
  sponsorUser: number;

  @Type(() => Number)
  @IsInt()
  partnerUser: number;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isValid: boolean;
}
