import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSocietyDto } from './create-user-society.dto';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserSocietiesDto extends PartialType(CreateUserSocietyDto) {
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  fk_user: number;

  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  fk_society: number;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  isValid: boolean;
}
