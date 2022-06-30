import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserBillingDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  fk_user: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  billing: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  isValid: boolean;
}
