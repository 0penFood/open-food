import { PartialType } from '@nestjs/swagger';
import { CreateRankingDto } from './create-ranking.dto';
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateRankingDto extends PartialType(CreateRankingDto) {

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty()
  userId: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  idSociety: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty()
  stars: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  commentary: string;
}
