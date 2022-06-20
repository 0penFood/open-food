import { PartialType } from '@nestjs/mapped-types';
import { CreateSocietyDto } from './create-society.dto';
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateSocietyDto extends PartialType(CreateSocietyDto) {

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  societyAuth: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  societyName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  sepa: string;

  @IsString()
  @IsOptional()
  area: string

  @IsString()
  @IsOptional()
  idRestaurant: string;
}
