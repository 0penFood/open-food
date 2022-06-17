import { PartialType } from '@nestjs/mapped-types';
import { CreateSocietyDto } from './create-society.dto';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateSocietyUserDto extends PartialType(CreateSocietyDto) {

  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  idUser: number;

  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  idSociety: number;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isValid: boolean;

}
