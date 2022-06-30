import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { CommandesService } from './commandes.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { CreateArticleCommandeDto } from "./dto/create-article-commande.dto";
import { UpdateArticleCommandeDto } from "./dto/update-article-commande.dto";
import { RolesGuard } from "../roles/guards/roles.guard";
import { AccountScopeGuard } from "../roles/guards/account-scope.guard";
import { ComposeUserAuthGuard } from "../roles/guards/compose-user-auth.guard";

@Controller('commandes')
export class CommandesController {
  constructor(private readonly commandesService: CommandesService) {}


  // ################# CREATE ROUTE PART #################

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [process.env.USER_RIGHTS], []))
  @Post()
  create(@Body() createCommandeDto: CreateCommandeDto) {
    return this.commandesService.createCommande(createCommandeDto);
  }


  @UseGuards(new AccountScopeGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS, process.env.USER_RIGHTS, process.env.RESTAURANT_RIGHTS]))
  @Post(':id/article')
  createArticle(@Param('id') id: string,@Body() createArticleCommandeDto: CreateArticleCommandeDto) {
    return this.commandesService.createArticle(id, createArticleCommandeDto);
  }


  // ################# FIND ROUTE PART #################

  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS]))
  @Get()
  findAll() {
    return this.commandesService.findAll();
  }


  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [process.env.USER_RIGHTS], [process.env.RESTAURANT_RIGHTS, process.env.DELIVER_RIGHTS]))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commandesService.findOne(id);
  }

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [process.env.USER_RIGHTS], []))
  @Get('user/:id')
  findAllUser(@Param('id') id: string) {
    return this.commandesService.findAllUser(+id);
  }

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [process.env.USER_RIGHTS], []))
  @Get('user/active/:id')
  findAllUserActive(@Param('id') id: string) {
    return this.commandesService.findAllUserActive(+id);
  }

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [], [process.env.RESTAURANT_RIGHTS]))
  @Get('restaurant/:id')
  findAllRestau(@Param('id') id: string) {
    return this.commandesService.findAllRestau(id);
  }

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [], [process.env.RESTAURANT_RIGHTS]))
  @Get('restaurant/active/:id')
  findAllRestauActive(@Param('id') id: string) {
    return this.commandesService.findAllRestauActive(id);
  }


  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [], [process.env.DELIVER_RIGHTS]))
  @Get('delivery/:id')
  findAllDelivery(@Param('id') id: string) {
    return this.commandesService.findAllDelivery(+id);
  }

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [], [process.env.DELIVER_RIGHTS]))
  @Get('delivery/active/:id')
  findAllDeliveryActive(@Param('id') id: string) {
    return this.commandesService.findAllDeliveryActive(+id);
  }


  // ################# UPDATE ROUTE PART #################
  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [process.env.USER_RIGHTS], [process.env.DELIVER_RIGHTS, process.env.RESTAURANT_RIGHTS]))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommandeDto: UpdateCommandeDto) {
    return this.commandesService.updateCommand(id, updateCommandeDto);
  }

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [process.env.USER_RIGHTS], [process.env.DELIVER_RIGHTS, process.env.RESTAURANT_RIGHTS]))
  @Patch(':id/article/:idA')
  updateArticle(@Param('id') id: string, @Param('idA') idA: string,@Body() updateArticleCommandeDto: UpdateArticleCommandeDto) {
    return this.commandesService.updateArticle(id, updateArticleCommandeDto, idA);
  }


  // ################# DELETE ROUTE PART #################

  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS]))
  @Delete(':id')
  removeCommand(@Param('id') id: string) {
    return this.commandesService.removeCommand(id);
  }

  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS]))
  @Delete('article/:id')
  removeArticle(@Param('id') id: string) {
    return this.commandesService.removeArticle(id);
  }
}
