import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateUserBillingDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  fk_user: number;

  @IsNotEmpty()
  @IsString()
  billing: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isValid: boolean;
}
