import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateRestaurantMenuDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  details: string;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  price: number;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  timePreparedDef: number;


  @IsOptional()
  @IsString()
  @IsNotEmpty()
  providerId: string;
}
