import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from './auth.service';
import { AuthController } from "./auth.controller";

@Module({
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
