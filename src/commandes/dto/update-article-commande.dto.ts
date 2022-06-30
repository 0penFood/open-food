import { PartialType } from '@nestjs/swagger';
import { CreateCommandeDto } from './create-commande.dto';
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateArticleCommandeDto extends PartialType(CreateCommandeDto) {
  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  quantity: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  commandesID: string;
}
