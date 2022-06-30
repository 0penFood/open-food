import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { SocietiesService } from './societies.service';
import { CreateSocietyDto } from './dto/create-society.dto';
import { UpdateSocietyDto } from './dto/update-society.dto';
import { RolesGuard } from "../roles/guards/roles.guard";
import { ComposeUserAuthGuard } from "../roles/guards/compose-user-auth.guard";

@Controller('societies')
export class SocietiesController {
  constructor(private readonly societiesService: SocietiesService) {}


  // ######################### CREATE ROUTE PART #########################

  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS, process.env.USER_RIGHTS]))
  @Post()
  create(@Body() createSocietyDto: CreateSocietyDto) {
    return this.societiesService.create(createSocietyDto);
  }


  // ######################### FIND ROUTE PART #########################

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [], [process.env.RESTAURANT_RIGHTS, process.env.DELIVER_RIGHTS]))
  @Get('full')
  findAllFull() {
    return this.societiesService.findAllFull();
  }

  @Get('partial')
  findAllPartial() {
    return this.societiesService.findAllPartial();
  }

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [], [process.env.RESTAURANT_RIGHTS, process.env.DELIVER_RIGHTS]))
  @Get(':id/full')
  findOneFull(@Param('id') id: string) {
    return this.societiesService.findOneFull(+id);
  }

  @Get(':id/partial')
  findOnePartial(@Param('id') id: string) {
    return this.societiesService.findOnePartial(+id);
  }

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [], [process.env.RESTAURANT_RIGHTS, process.env.DELIVER_RIGHTS]))
  @Get(':id/restau/full')
  findOneRestauFull(@Param('id') id: string) {
    return this.societiesService.findOneRestauFull(id);
  }


  @Get(':id/restau/partial')
  findOneRestauPartial(@Param('id') id: string) {
    return this.societiesService.findOneRestauPartial(id);
  }


  // ######################### UPDATE ROUTE PART #########################

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [], [process.env.RESTAURANT_RIGHTS, process.env.DELIVER_RIGHTS]))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocietyDto: UpdateSocietyDto) {
    return this.societiesService.update(+id, updateSocietyDto);
  }


  // ######################### REMOVE ROUTE PART #########################

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [], [process.env.RESTAURANT_RIGHTS, process.env.DELIVER_RIGHTS]))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.societiesService.remove(+id);
  }
}
