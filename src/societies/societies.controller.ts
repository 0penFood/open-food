import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SocietiesService } from './societies.service';
import { CreateSocietyDto } from './dto/create-society.dto';
import { UpdateSocietyDto } from './dto/update-society.dto';

@Controller('societies')
export class SocietiesController {
  constructor(private readonly societiesService: SocietiesService) {}

  @Post('create')
  create(@Body() createSocietyDto: CreateSocietyDto) {
    return this.societiesService.create(createSocietyDto);
  }

  @Get('read')
  findAll() {
    return this.societiesService.findAll();
  }

  @Get('read/:id')
  findOne(@Param('id') id: string) {
    return this.societiesService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateSocietyDto: UpdateSocietyDto) {
    return this.societiesService.update(+id, updateSocietyDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.societiesService.remove(+id);
  }
}
