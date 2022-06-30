import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSocietyDto } from './create-user-society.dto';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserAddressDto extends PartialType(CreateUserSocietyDto) {
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  fk_user: number;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @ApiProperty()
  address: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  isValid: boolean;
}
