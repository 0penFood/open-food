import { Injectable } from "@nestjs/common";
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PrismaClient } from '@internal/prisma/client';
import { CreateRestaurantMenuDto } from "./dto/create-restaurant-menu.dto";
import { Logger } from "../../helpers/logger";
import { CreateRestaurantMenuArticleDto } from "./dto/create-restaurant-menu-articles.dto";
import { UpdateRestaurantMenuDto } from "./dto/update-restaurant-menu.dto";
import { UpdateRestaurantMenuArticleDto } from "./dto/update-restaurant-menu-articles.dto";

const prisma2 = new PrismaClient()


@Injectable()
export class RestaurantsService {

  // ################# CREATE FUNCTION PART #################

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

  async createMenuArticle(id: string, createRestaurantMenuArticleDto: CreateRestaurantMenuArticleDto) {
    await prisma2.$connect();
    await prisma2.menus.update({
      where: {
        id: id
      },
      data: {
        articles: {
          createMany: {
            data: [createRestaurantMenuArticleDto],
          },
        },
      },
      });
    await prisma2.$disconnect();
    return 'This action adds a new articles';
  }


  // #################  FIND FUNCTION PART #################

  async findAll() {
    await prisma2.$connect();
    const allRestaurants = await prisma2.restaurants.findMany();
    await prisma2.$disconnect();

    let restaurants = {};

    allRestaurants.forEach(restaurant => {
      restaurants[restaurant.id] = {
        type: restaurant.type,
      }
    })
    await Logger.infoLog('api', 'All restaurants have been read');
    return restaurants;
  }

  async findAllWithMenus() {
    await prisma2.$connect();
    const allRestaurants = await prisma2.restaurants.findMany({
      include:{
        menus: true,
      },
    });

    await prisma2.$disconnect();
    let restaurants = {};

    allRestaurants.forEach(restaurant => {
      restaurants[restaurant.id] = {
        type: restaurant.type,
        menus: restaurant.menus,
      }
    })
    await Logger.infoLog('api', 'All restaurants have been read with Menu');
    return restaurants;
  }

  async findAllMenuAndArticles(idMenu: string)
  {
    prisma2.$connect();
    const allMenus = await prisma2.menus.findMany({
      include:{
        articles: true,
      },
      where:{
        id: idMenu,
      }
    });
    prisma2.$disconnect();
    let menus = {};

    allMenus.forEach(menu => {
      menus[menu.id] = {
        name: menu.name,
        articles: menu.articles,
      }
    })
    await Logger.infoLog('api', 'Menu with id ' + idMenu + ' have been read');
    return menus;
  }

  async findOneRestaurant(id: string) {
    await prisma2.$connect();
    const restaurant = await prisma2.restaurants.findMany({
      include:{
        menus: true,
      },
      where:{
        id: id
      }
    });

    await prisma2.$disconnect();
    return restaurant;
  }


  // ################# UPDATE FUNCTION PART #################

  async updateRestaurant(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    await prisma2.$connect();
    await prisma2.restaurants.update({
      data: updateRestaurantDto,
      where: {
        id: id
      }
    });
    await prisma2.$disconnect();
    return 'This action update restaurant with id ' + id;
  }

  async updateMenu(id: string, updateRestaurantMenuDto: UpdateRestaurantMenuDto) {
    await prisma2.$connect();
    const test = await prisma2.menus.update({
      data: updateRestaurantMenuDto,
      where: {
        id: id
      }
    });
    await prisma2.$disconnect();
    console.log(test);
    console.log(updateRestaurantMenuDto.name);
    return 'This action update menu with id ' + id;
  }

  async updateMenuArticle(id: string, updateRestaurantMenuArticleDto: UpdateRestaurantMenuArticleDto) {
    await prisma2.$connect();
    await prisma2.articles.update({
      data: updateRestaurantMenuArticleDto,
      where: {
        id: id
      }
    });
    await prisma2.$disconnect();
    return 'This action update article menu with id ' + id;
  }


  // ################# REMOVE FUNCTION PART #################

  async removeRestaurant(id: string) {
    await prisma2.$connect();
    await this.removeMenus(id);

    await prisma2.restaurants.update({
      where: {
        id: id
      },
      data:{
        menus: undefined
      }
    });


    await prisma2.restaurants.delete({
      where: {
        id: id
      }
    });
    await prisma2.$disconnect();
    return `This action removes a #${id} restaurant`;
  }

  async removeMenu(id: string) {
    await prisma2.$connect();
    await prisma2.menus.delete({
      where: {
        id: id
      }
    });
    await prisma2.$disconnect();
    return `This action removes menu with ${id}`;
  }

  async removeMenus(id: string) {
    await prisma2.$connect();

    const AllMenus = await prisma2.menus.findMany({
      where:{
        providerId: id
      }
    });

    await AllMenus.forEach(async(menu) =>{
      await this.removeArticles(menu.id);
      await prisma2.menus.update({
        where: {
          id: menu.id,
        },
        data:{
          articles : undefined
        }
      });

      await prisma2.menus.delete({
        where: {
          id: menu.id,
        }
      });
    })

    await prisma2.$disconnect();
    return `This action removes all menu link to restaurant with id ${id}`;
  }

  async removeArticle(id: string) {
    await prisma2.$connect();
    await prisma2.articles.delete({
      where: {
        id: id
      }
    });
    await prisma2.$disconnect();
    return `This action removes a #${id} restaurant`;
  }

  async removeArticles(id: string) {
    await prisma2.$connect();

    const allArticles = await prisma2.articles.findMany({
      where:{
        containerId: id
      }
    });

    await allArticles.forEach(async(article) =>{
      await prisma2.articles.delete({
        where: {
          id: article.id,
        }
      });
    })

    await prisma2.$disconnect();
    return `This action removes all article to Menu with id : ${id}`;
  }
}
