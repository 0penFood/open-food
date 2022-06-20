import { IsBoolean, IsInt, IsNotEmpty } from "class-validator";
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

  @IsBoolean()
  @IsNotEmpty()
  isValid: boolean;
}
