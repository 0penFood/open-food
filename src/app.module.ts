import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { SocietiesModule } from './societies/societies.module';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [UsersModule, PrismaModule, SocietiesModule, RestaurantsModule],
})
export class AppModule {}
