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
    try
    {
      await prisma2.restaurants.create({data: createRestaurantDto});
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Restaurant is created');
      return {
        message: 'Restaurant is created',
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : ' + e.message);
      throw e;
    }
  }

  async createMenu(id: string, createRestaurantMenuDto: CreateRestaurantMenuDto) {
    await prisma2.$connect();
    try
    {
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
      await Logger.infoLog('api', 'Restaurant with id ' + id + ' add menu');
      return {
        message: 'Restaurant with id ' + id + ' add menu',
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : ' + e.message);
      throw e;
    }
  }

  async createMenuArticle(id: string, createRestaurantMenuArticleDto: CreateRestaurantMenuArticleDto) {
    await prisma2.$connect();
    try
    {
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
      await Logger.infoLog('api', 'Menu with id ' + id + ' add article');
      return {
        message: 'Menu with id ' + id + ' add article',
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : ' + e.message);
      throw e;
    }
  }


  // #################  FIND FUNCTION PART #################

  async findAll() {
    await prisma2.$connect();
    try
    {
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
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async findAllWithMenus() {
    await prisma2.$connect();
    try
    {
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
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async findAllMenuAndArticles(idMenu: string)
  {
    await prisma2.$connect();
    try
    {
      const allMenus = await prisma2.menus.findMany({
        include:{
          articles: true,
        },
        where:{
          id: idMenu,
        }
      });
      await prisma2.$disconnect();
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
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async findOneRestaurant(id: string) {
    await prisma2.$connect();
    try
    {
      const restaurant = await prisma2.restaurants.findMany({
        include:{
          menus: true,
        },
        where:{
          id: id
        }
      });

      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Recover restaurant with id ' + id );

      return restaurant;
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }


  // ################# UPDATE FUNCTION PART #################

  async updateRestaurant(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    await prisma2.$connect();
    try
    {
      await prisma2.restaurants.update({
        where:{
          id: id
        },
        data: updateRestaurantDto
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Restaurant with id ' + id + ' updated ');
      return {
        message: 'Restaurant with id ' + id + ' updated ',
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : ' + e.message);
      throw e;
    }
  }

  async updateMenu(id: string, updateRestaurantMenuDto: UpdateRestaurantMenuDto) {
    await prisma2.$connect();
    try
    {
      await prisma2.menus.update({
        data: updateRestaurantMenuDto,
        where: {
          id: id
        }
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Menu with id ' + id + ' updated ');
      return {
        message: 'Menu with id ' + id + ' updated ',
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : ' + e.message);
      throw e;
    }
  }

  async updateMenuArticle(id: string, updateRestaurantMenuArticleDto: UpdateRestaurantMenuArticleDto) {
    await prisma2.$connect();
    try
    {
      await prisma2.articles.update({
        data: updateRestaurantMenuArticleDto,
        where: {
          id: id
        }
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Article with id ' + id + ' updated ');
      return {
        message: 'Article with id ' + id + ' updated ',
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : ' + e.message);
      throw e;
    }
  }


  // ################# REMOVE FUNCTION PART #################

  async removeRestaurant(id: string) {
    await prisma2.$connect();
    try
    {
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
      await Logger.infoLog('api', 'Restaurant with id ' + id + ' deleted');

      return {
        message: 'Restaurant with id ' + id + ' deleted',
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async removeMenu(id: string) {
    await prisma2.$connect();
    try
    {
      await prisma2.menus.delete({
        where: {
          id: id
        }
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Menu with id ' + id + ' deleted');

      return {
        message: 'Menu with id ' + id + ' deleted',
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async removeMenus(id: string) {
    await prisma2.$connect();
    try
    {
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
      });

      await prisma2.$disconnect();
      await Logger.infoLog('api', 'All menu link to restaurant with id ' + id +' removed');

      return {
        message: 'All menu link to restaurant with id ' + id +' removed',
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async removeArticle(id: string) {
    await prisma2.$connect();
    try
    {
      await prisma2.articles.delete({
        where: {
          id: id
        }
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Article with id ' + id + ' deleted');

      return {
        message: 'Article with id ' + id + ' deleted',
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async removeArticles(id: string) {
    await prisma2.$connect();
    try
    {
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
      await Logger.infoLog('api', 'All article to Menu with id ' + id + ' deleted');

      return {
        message: 'All article to Menu with id ' + id + ' deleted',
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }
}
