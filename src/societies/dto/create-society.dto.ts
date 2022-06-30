import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateSocietyDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  societyAuth: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  societyName: string;

  @IsString()
  @IsNotEmpty()
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
