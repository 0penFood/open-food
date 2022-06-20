import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSocietyDto } from './create-user-society.dto';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateUserBillingDto extends PartialType(CreateUserSocietyDto) {
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  fk_user: number;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  billing: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isValid: boolean;
}
