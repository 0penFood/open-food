import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommandesService } from './commandes.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { CreateArticleCommandeDto } from "./dto/create-article-commande.dto";
import { UpdateArticleCommandeDto } from "./dto/update-article-commande.dto";

@Controller('commandes')
export class CommandesController {
  constructor(private readonly commandesService: CommandesService) {}


  // ################# CREATE ROUTE PART #################

  @Post()
  create(@Body() createCommandeDto: CreateCommandeDto) {
    return this.commandesService.createCommande(createCommandeDto);
  }

  @Post(':id/article')
  createArticle(@Param('id') id: string,@Body() createArticleCommandeDto: CreateArticleCommandeDto) {
    return this.commandesService.createArticle(id, createArticleCommandeDto);
  }


  // ################# FIND ROUTE PART #################

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commandesService.findOne(id);
  }


  @Get('user/:id')
  findAllUser(@Param('id') id: string) {
    return this.commandesService.findAllUser(+id);
  }

  @Get('user/active/:id')
  findAllUserActive(@Param('id') id: string) {
    return this.commandesService.findAllUserActive(+id);
  }


  @Get('restaurant/:id')
  findAllRestau(@Param('id') id: string) {
    return this.commandesService.findAllRestau(id);
  }

  @Get('restaurant/active/:id')
  findAllRestauActive(@Param('id') id: string) {
    return this.commandesService.findAllRestauActive(id);
  }


  @Get('delivery/:id')
  findAllDelivery(@Param('id') id: string) {
    return this.commandesService.findAllDelivery(+id);
  }

  @Get('delivery/active/:id')
  findAllDeliveryActive(@Param('id') id: string) {
    return this.commandesService.findAllDeliveryActive(+id);
  }


  // ################# UPDATE ROUTE PART #################

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommandeDto: UpdateCommandeDto) {
    return this.commandesService.updateCommand(id, updateCommandeDto);
  }

  @Patch(':id/article/:idA')
  updateArticle(@Param('id') id: string, @Param('idA') idA: string,@Body() updateArticleCommandeDto: UpdateArticleCommandeDto) {
    return this.commandesService.updateArticle(id, updateArticleCommandeDto, idA);
  }


  // ################# DELETE ROUTE PART #################

  @Delete(':id')
  removeCommand(@Param('id') id: string) {
    return this.commandesService.removeCommand(id);
  }

  @Delete('article/:id')
  removeArticle(@Param('id') id: string) {
    return this.commandesService.removeArticle(id);
  }
}
