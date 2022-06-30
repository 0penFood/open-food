import { PartialType } from '@nestjs/swagger';
import { CreateCommandeDto } from './create-commande.dto';
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateCommandeDto extends PartialType(CreateCommandeDto) {


  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  idUser: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  idRestau: string;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  idLivreur: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  timeDelivery: string;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  state: number;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  price: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  deliveryAddress: string;
}
