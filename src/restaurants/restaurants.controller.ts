import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { CreateRestaurantMenuDto } from "./dto/create-restaurant-menu.dto";
import { CreateRestaurantMenuArticleDto } from "./dto/create-restaurant-menu-articles.dto";
import { UpdateRestaurantMenuDto } from "./dto/update-restaurant-menu.dto";
import { UpdateRestaurantMenuArticleDto } from "./dto/update-restaurant-menu-articles.dto";
import { ComposeUserAuthGuard } from "../roles/guards/compose-user-auth.guard";

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}


  // ################# CREATE ROUTE PART #################

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [process.env.RESTAURANT_RIGHTS, process.env.DELIVER_RIGHTS], []))
  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [], [process.env.RESTAURANT_RIGHTS]))
  @Post(':id/menus')
  createMenu(@Param('id') id: string, @Body() createRestaurantMenuDto: CreateRestaurantMenuDto) {
    return this.restaurantsService.createMenu(id, createRestaurantMenuDto);
  }

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [], [process.env.RESTAURANT_RIGHTS]))
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

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [], [process.env.RESTAURANT_RIGHTS]))
  @Patch(':id')
  updateRestaurant(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantsService.updateRestaurant(id, updateRestaurantDto);
  }

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [], [process.env.RESTAURANT_RIGHTS]))
  @Patch('menu/:id')
  updateMenu(@Param('id') id: string, @Body() updateRestaurantMenuDto: UpdateRestaurantMenuDto) {
    return this.restaurantsService.updateMenu(id, updateRestaurantMenuDto);
  }

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [], [process.env.RESTAURANT_RIGHTS]))
  @Patch('article/:id')
  updateMenuArticle(@Param('id') id: string, @Body() updateRestaurantMenuArticleDto: UpdateRestaurantMenuArticleDto) {
    return this.restaurantsService.updateMenuArticle(id, updateRestaurantMenuArticleDto);
  }


  // ################# DELETE ROUTE PART #################

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [], [process.env.RESTAURANT_RIGHTS]))
  @Delete(':id')
  removeRestaurant(@Param('id') id: string) {
    return this.restaurantsService.removeRestaurant(id);
  }

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [], [process.env.RESTAURANT_RIGHTS]))
  @Delete('menu/:id')
  removeMenu(@Param('id') id: string) {
    return this.restaurantsService.removeMenu(id);
  }

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [], [process.env.RESTAURANT_RIGHTS]))
  @Delete(':id/menus')
  removeMenus(@Param('id') id: string) {
    return this.restaurantsService.removeMenus(id);
  }

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [], [process.env.RESTAURANT_RIGHTS]))
  @Delete('article/:id')
  removeArticle(@Param('id') id: string) {
    return this.restaurantsService.removeArticle(id);
  }

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [], [process.env.RESTAURANT_RIGHTS]))
  @Delete(':id/articles')
  removeArticles(@Param('id') id: string) {
    return this.restaurantsService.removeArticles(id);
  }
}
