import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class CreatePartnershipUsersDto {

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  sponsorUser: number;

  @IsNotEmpty()
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
