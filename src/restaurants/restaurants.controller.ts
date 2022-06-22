import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { CreateRestaurantMenuDto } from "./dto/create-restaurant-menu.dto";
import { CreateRestaurantMenuArticleDto } from "./dto/create-restaurant-menu-articles.dto";
import { UpdateRestaurantMenuDto } from "./dto/update-restaurant-menu.dto";
import { UpdateRestaurantMenuArticleDto } from "./dto/update-restaurant-menu-articles.dto";

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}


  // ################# CREATE ROUTE PART #################

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Post(':id/menus')
  createMenu(@Param('id') id: string, @Body() createRestaurantMenuDto: CreateRestaurantMenuDto) {
    return this.restaurantsService.createMenu(id, createRestaurantMenuDto);
  }

  @Post('menu/:id')
  createMenuArticle(@Param('id') id: string, @Body() createRestaurantMenuArticleDto: CreateRestaurantMenuArticleDto) {
    return this.restaurantsService.createMenuArticle(id, createRestaurantMenuArticleDto);
  }


  // ################# FIND ROUTE PART #################

  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get('menus')
  findAllWithMenus() {
    return this.restaurantsService.findAllWithMenus();
  }

  @Get('menu/:id')
  findAllToMenu(@Param('id') id: string) {
    return this.restaurantsService.findAllMenuAndArticles(id);
  }

  @Get(':id')
  findOneRestaurant(@Param('id') id: string) {
    return this.restaurantsService.findOneRestaurant(id);
  }


  // ################# UPDATE ROUTE PART #################

  @Patch(':id')
  updateRestaurant(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantsService.updateRestaurant(id, updateRestaurantDto);
  }

  @Patch('menu/:id')
  updateMenu(@Param('id') id: string, @Body() updateRestaurantMenuDto: UpdateRestaurantMenuDto) {
    return this.restaurantsService.updateMenu(id, updateRestaurantMenuDto);
  }

  @Patch('article/:id')
  updateMenuArticle(@Param('id') id: string, @Body() updateRestaurantMenuArticleDto: UpdateRestaurantMenuArticleDto) {
    return this.restaurantsService.updateMenuArticle(id, updateRestaurantMenuArticleDto);
  }


  // ################# DELETE ROUTE PART #################

  @Delete(':id')
  removeRestaurant(@Param('id') id: string) {
    return this.restaurantsService.removeRestaurant(id);
  }

  @Delete('menu/:id')
  removeMenu(@Param('id') id: string) {
    return this.restaurantsService.removeMenu(id);
  }

  @Delete(':id/menus')
  removeMenus(@Param('id') id: string) {
    return this.restaurantsService.removeMenus(id);
  }

  @Delete('article/:id')
  removeArticle(@Param('id') id: string) {
    return this.restaurantsService.removeArticle(id);
  }

  @Delete(':id/articles')
  removeArticles(@Param('id') id: string) {
    return this.restaurantsService.removeArticles(id);
  }
}
