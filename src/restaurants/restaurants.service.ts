import { Injectable, Param } from "@nestjs/common";
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PrismaClient } from '@internal/prisma/client';
import { CreateRestaurantMenuDto } from "./dto/create-restaurant-menu.dto";
import { create } from "domain";
import { Logger } from "../../helpers/logger";

const prisma2 = new PrismaClient()


@Injectable()
export class RestaurantsService {
  async create(createRestaurantDto: CreateRestaurantDto) {
    await prisma2.$connect();
    await prisma2.restaurants.create({data: createRestaurantDto});
    await prisma2.$disconnect();
    return 'This action adds a new restaurant';
  }

  async createMenu(id: string, createRestaurantMenuDto: CreateRestaurantMenuDto) {
    await prisma2.$connect();
    await prisma2.restaurants.update({
      where: {
        id: id
      },
      data: {
        menus: {
          createMany: {
            data: [createRestaurantMenuDto],
          },
        },
      },
      });
    await prisma2.$disconnect();
    return 'This action adds a new menus';
  }

  async findAll() {
    prisma2.$connect();
    const allRestaurants = await prisma2.restaurants.findMany({
      include:{
        menus: true,
      },
    });
    console.log(allRestaurants);
    prisma2.$disconnect();
    let restaurants = {};

    allRestaurants.forEach(restaurant => {
      restaurants[restaurant.id] = {
        type: restaurant.type,
        menus: restaurant.menus,
      }
    })
    await Logger.infoLog('api', 'All restaurants have been read');
    return restaurants;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
