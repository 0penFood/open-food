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
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsOptional()
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

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isValid: boolean;
}
