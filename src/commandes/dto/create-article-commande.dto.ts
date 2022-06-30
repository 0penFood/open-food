import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class CreateArticleCommandeDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  commandesID: string;
}
