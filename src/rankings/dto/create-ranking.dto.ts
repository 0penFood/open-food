import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateRankingDto {

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  idSociety: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  stars: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  commentary: string;
}
