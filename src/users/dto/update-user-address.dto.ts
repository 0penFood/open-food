import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSocietyDto } from './create-user-society.dto';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateUserAddressDto extends PartialType(CreateUserSocietyDto) {
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  fk_user: number;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  address: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isValid: boolean;
}
