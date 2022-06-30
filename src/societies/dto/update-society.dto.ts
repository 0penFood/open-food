import { PartialType } from '@nestjs/mapped-types';
import { CreateSocietyDto } from './create-society.dto';
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateSocietyDto extends PartialType(CreateSocietyDto) {

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  societyAuth: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  societyName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  sepa: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  area: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  idRestaurant: string;
}
