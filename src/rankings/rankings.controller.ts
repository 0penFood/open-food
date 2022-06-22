import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';

@Controller('rankings')
export class RankingsController {
  constructor(private readonly rankingsService: RankingsService) {}


  // ######################### CREATE ROUTE PART #########################

  @Post()
  create(@Body() createRankingDto: CreateRankingDto) {
    return this.rankingsService.create(createRankingDto);
  }


  // ######################### FIND ROUTE PART #########################

  @Get('user/:id')
  findAllByUser(@Param('id') id: string) {
    return this.rankingsService.findAllByUser(+id);
  }

  @Get('society/:id')
  findAllBySociety(@Param('id') id: string) {
    return this.rankingsService.findAllBySociety(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rankingsService.findOne(id);
  }


  // ######################### UPDATE ROUTE PART #########################

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRankingDto: UpdateRankingDto) {
    return this.rankingsService.update(id, updateRankingDto);
  }


  // ######################### DELETE ROUTE PART #########################

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rankingsService.remove(id);
  }
}
