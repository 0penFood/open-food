import { PartialType } from '@nestjs/swagger';
import { CreateCommandeDto } from './create-commande.dto';
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateArticleCommandeDto extends PartialType(CreateCommandeDto) {
  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  quantity: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  commandesID: string;
}
