import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSocietyDto } from './create-user-society.dto';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class UpdateUserSocietiesDto extends PartialType(CreateUserSocietyDto) {
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  fk_user: number;

  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  fk_society: number;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isValid: boolean;
}
