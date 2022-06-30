import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserSocietyDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  fk_user: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  fk_society: number;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  isValid: boolean;
}
