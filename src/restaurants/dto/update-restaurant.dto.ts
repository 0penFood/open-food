import { PartialType } from '@nestjs/swagger';
import { CreateRestaurantDto } from './create-restaurant.dto';
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  type: string;
}
