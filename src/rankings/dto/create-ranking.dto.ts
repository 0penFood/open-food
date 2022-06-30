import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class CreateRankingDto {

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  idSociety: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  stars: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  commentary: string;
}
