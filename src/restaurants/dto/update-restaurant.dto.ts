import { PartialType } from '@nestjs/swagger';
import { CreateRestaurantDto } from './create-restaurant.dto';
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  type: string;
}
