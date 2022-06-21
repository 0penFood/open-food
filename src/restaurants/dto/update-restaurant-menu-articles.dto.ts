import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateRestaurantMenuArticleDto {

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  timePreparedDef: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  pathPicture: string;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  quantity: number;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  price: number;


  @IsOptional()
  @IsString()
  @IsNotEmpty()
  containerId : string;
}
