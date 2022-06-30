import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class CreateRestaurantMenuDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  details: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  timePreparedDef: number;


  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  providerId: string;
}
