import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class CreateCommandeDto {

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  idUser: number;

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

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  timeDelivery: string;


  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  state: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  deliveryAddress: string;
}
