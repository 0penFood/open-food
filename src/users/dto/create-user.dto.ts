import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  accountType: number;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  coordonate: string;

  @IsOptional()
  @IsBoolean()
  ssoGoogle: boolean;

  @IsOptional()
  @IsBoolean()
  ssoFacebook: boolean;

  @IsOptional()
  @IsBoolean()
  ssoGitHub: boolean;
}

