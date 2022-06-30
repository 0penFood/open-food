import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class CreateRestaurantMenuArticleDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

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


  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  quantity: number;


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
