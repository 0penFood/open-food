import { IsNotEmpty, IsString } from "class-validator";

export class CreateRestaurantDto {

  @IsString()
  @IsNotEmpty()
  type: string;
}
