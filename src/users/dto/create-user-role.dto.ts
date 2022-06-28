import {
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateUserDto } from "./create-user.dto";

export class CreateUserRoleDto extends CreateUserDto{

  constructor(createUserDto: CreateUserDto) {
    super();
    this.lastName   = createUserDto.lastName;
    this.firstName  = createUserDto.firstName;
    this.password   = createUserDto.password;
    this.email      = createUserDto.email;
    this.phone      = createUserDto.phone;
    this.accountType   = createUserDto.accountType;
    this.coordonate   = createUserDto.coordonate;
  }
  @IsOptional()
  @IsString()
  roles: string;
}

