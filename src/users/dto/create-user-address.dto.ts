import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateUserAddressDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  fk_user: number;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isValid: boolean;
}
