import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateRestaurantMenuArticleDto {

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

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
  pathPicture: string;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  quantity: number;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  price: number;


  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  containerId : string;
}
