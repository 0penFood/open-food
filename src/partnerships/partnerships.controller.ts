import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartnershipsService } from './partnerships.service';
import { CreatePartnershipSocietysDto } from './dto/create-partnership-societys.dto';
import { UpdatePartnershipSocietysDto } from './dto/update-partnership-societys.dto';
import { CreatePartnershipUsersDto } from "./dto/create-partnership-users.dto";
import { UpdatePartnershipUsersDto } from "./dto/update-partnership-users.dto";

@Controller('partnerships')
export class PartnershipsController {
  constructor(private readonly partnershipsService: PartnershipsService) {}


  // ###################### CREATE ROUTE PART ######################

  @Post('societies')
  createSociety(@Body() createPartnershipSocietysDto: CreatePartnershipSocietysDto) {
    return this.partnershipsService.createSociety(createPartnershipSocietysDto);
  }

  @Post('users')
  createUser(@Body() createPartnershipUsersDto: CreatePartnershipUsersDto) {
    return this.partnershipsService.createUser(createPartnershipUsersDto);
  }


  // ###################### FIND ROUTE PART ######################

  @Get(':id/society/sponsor')
  findSocietySponsor(@Param('id') id: string) {
    return this.partnershipsService.findSocietySponsor(id);
  }

  @Get(':id/society/partner')
  findSocietyPartner(@Param('id') id: string) {
    return this.partnershipsService.findSocietyPartner(id);
  }

  @Get(':id/user/sponsor')
  findUserSponsor(@Param('id') id: string) {
    return this.partnershipsService.findUserSponsor(+id);
  }

  @Get(':id/user/partner')
  findUserPartner(@Param('id') id: string) {
    return this.partnershipsService.findUserPartner(+id);
  }

  @Get()
  findAll() {
    return this.partnershipsService.findAll();
  }


  // ###################### UPDATE ROUTE PART ######################

  @Patch(':id/society')
  updateSociety(@Param('id') id: string, @Body() updatePartnershipDto: UpdatePartnershipSocietysDto) {
    return this.partnershipsService.updateSociety(id, updatePartnershipDto);
  }

  @Patch(':id/user')
  updateUser(@Param('id') id: string, @Body() updatePartnershipUsersDto: UpdatePartnershipUsersDto) {
    return this.partnershipsService.updateUser(id, updatePartnershipUsersDto);
  }


  // ###################### DELETE ROUTE PART ######################

  @Delete(':id')
  removeSociety(@Param('id') id: string) {
    return this.partnershipsService.removeSociety(id);
  }
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.partnershipsService.removeUser(id);
  }
}
