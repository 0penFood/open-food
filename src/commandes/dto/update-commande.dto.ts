import { PartialType } from '@nestjs/swagger';
import { CreateCommandeDto } from './create-commande.dto';
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateCommandeDto extends PartialType(CreateCommandeDto) {


  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  idUser: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  idRestau: string;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  idLivreur: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  timeDelivery: string;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  state: number;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  price: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  deliveryAddress: string;
}
