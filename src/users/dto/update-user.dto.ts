import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
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

  @IsOptional()
  @IsBoolean()
  isValid: boolean;
}
