import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateRestaurantMenuArticleDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  timePreparedDef: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  pathPicture: string;


  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  quantity: number;


  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  price: number;


  @IsOptional()
  @IsString()
  @IsNotEmpty()
  containerId : string;
}
