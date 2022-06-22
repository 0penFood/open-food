import { PartialType } from '@nestjs/swagger';
import { CreateRankingDto } from './create-ranking.dto';
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateRankingDto extends PartialType(CreateRankingDto) {

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  userId: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  idSociety: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  stars: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  commentary: string;
}
