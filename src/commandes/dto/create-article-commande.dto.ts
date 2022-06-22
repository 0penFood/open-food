import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateArticleCommandeDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  commandesID: string;
}
