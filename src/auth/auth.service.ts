import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService){}
  async signup(dto: AuthDto){
    return 'Signup';
  }

  signin(dto: AuthDto){
    return 'Signin';
  }
}
