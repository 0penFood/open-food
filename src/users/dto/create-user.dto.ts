import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  password: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  accountType: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  phone: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  coordonate: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  ssoGoogle: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  ssoFacebook: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  ssoGitHub: boolean;
}

