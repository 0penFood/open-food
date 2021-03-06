import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../roles/strategy/local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [
      UsersModule,
      PassportModule,
      JwtModule.register({
        secret : process.env.JWT_SECRET,
        signOptions: { expiresIn: '7 days' },
      }),
  ],
  providers: [AuthService, LocalStrategy],
  exports : [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
