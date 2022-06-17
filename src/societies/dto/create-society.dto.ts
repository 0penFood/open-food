import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSocietyDto {

  @IsString()
  @IsNotEmpty()
  societyAuth: string;

  @IsString()
  @IsNotEmpty()
  societyName: string;

  @IsString()
  @IsNotEmpty()
  sepa: string;

  @IsString()
  @IsOptional()
  area: string

  @IsString()
  @IsOptional()
  idRestaurant: string;
}
