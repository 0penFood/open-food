import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateRestaurantMenuDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  details: string;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  price: number;

  @IsOptional()
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
