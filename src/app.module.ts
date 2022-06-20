import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { SocietiesModule } from './societies/societies.module';

@Module({
  imports: [UsersModule, PrismaModule, SocietiesModule],
})
export class AppModule {}
