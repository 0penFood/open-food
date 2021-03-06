import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { RankingsService } from './rankings.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { ComposeUserAuthGuard } from "../roles/guards/compose-user-auth.guard";

@Controller('rankings')
export class RankingsController {
  constructor(private readonly rankingsService: RankingsService) {}


  // ######################### CREATE ROUTE PART #########################

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [process.env.USER_RIGHTS], []))
  @Post()
  create(@Body() createRankingDto: CreateRankingDto) {
    return this.rankingsService.create(createRankingDto);
  }


  // ######################### FIND ROUTE PART #########################

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [process.env.USER_RIGHTS], []))
  @Get('user/:id')
  findAllByUser(@Param('id') id: string) {
    return this.rankingsService.findAllByUser(+id);
  }

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [process.env.USER_RIGHTS], [process.env.RESTAURANT_RIGHTS, process.env.DELIVER_RIGHTS]))
  @Get('society/:id')
  findAllBySociety(@Param('id') id: string) {
    return this.rankingsService.findAllBySociety(id);
  }

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [process.env.USER_RIGHTS], [process.env.RESTAURANT_RIGHTS, process.env.DELIVER_RIGHTS]))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rankingsService.findOne(id);
  }


  // ######################### UPDATE ROUTE PART #########################

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [process.env.USER_RIGHTS], []))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRankingDto: UpdateRankingDto) {
    return this.rankingsService.update(id, updateRankingDto);
  }


  // ######################### DELETE ROUTE PART #########################

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [process.env.USER_RIGHTS], []))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rankingsService.remove(id);
  }
}
