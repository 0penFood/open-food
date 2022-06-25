import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateCommandeDto {

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  idUser: number;

  @IsNotEmpty()
  @IsString()
  idRestau: string;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  idLivreur: number;

  @IsNotEmpty()
  @IsString()
  timeDelivery: string;


  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  state: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  price: number;

  @IsNotEmpty()
  @IsString()
  deliveryAddress: string;
}
