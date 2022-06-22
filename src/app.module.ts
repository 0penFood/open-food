import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { SocietiesModule } from './societies/societies.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { AuthModule } from './auth/auth.module';
import { RolesService } from './roles/roles.service';
import { RolesModule } from './roles/roles.module';
import { RankingsModule } from './rankings/rankings.module';

@Module({
  imports: [UsersModule, PrismaModule, SocietiesModule, RestaurantsModule, AuthModule, RolesModule, RankingsModule],
  providers: [RolesService],
})
export class AppModule {}
