import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SocietiesService } from './societies.service';
import { CreateSocietyDto } from './dto/create-society.dto';
import { UpdateSocietyDto } from './dto/update-society.dto';

@Controller('societies')
export class SocietiesController {
  constructor(private readonly societiesService: SocietiesService) {}


  // ######################### CREATE ROUTE PART #########################

  @Post('')
  create(@Body() createSocietyDto: CreateSocietyDto) {
    return this.societiesService.create(createSocietyDto);
  }


  // ######################### FIND ROUTE PART #########################

  @Get('full')
  findAllFull() {
    return this.societiesService.findAllFull();
  }

  @Get('partial')
  findAllPartial() {
    return this.societiesService.findAllPartial();
  }

  @Get(':id/full')
  findOneFull(@Param('id') id: string) {
    return this.societiesService.findOneFull(+id);
  }

  @Get(':id/partial')
  findOnePartial(@Param('id') id: string) {
    return this.societiesService.findOnePartial(+id);
  }


  // ######################### UPDATE ROUTE PART #########################

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocietyDto: UpdateSocietyDto) {
    return this.societiesService.update(+id, updateSocietyDto);
  }


  // ######################### REMOVE ROUTE PART #########################

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.societiesService.remove(+id);
  }
}
