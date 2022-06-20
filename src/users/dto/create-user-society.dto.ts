import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class CreateUserSocietyDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  fk_user: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  fk_society: number;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isValid: boolean;
}
