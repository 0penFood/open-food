import { IsBoolean, IsInt, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

export class CreateSocietyUserDto {

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  idUser: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  idSociety: number;

  @IsBoolean()
  @IsNotEmpty()
  isValid: boolean;
}
