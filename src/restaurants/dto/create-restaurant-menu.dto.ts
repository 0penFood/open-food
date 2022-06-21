import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateRestaurantMenuDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  details: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  price: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  timePreparedDef: number;


  @IsOptional()
  @IsString()
  @IsNotEmpty()
  providerId: string;
}
