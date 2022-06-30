import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { PartnershipsService } from './partnerships.service';
import { CreatePartnershipSocietysDto } from './dto/create-partnership-societys.dto';
import { UpdatePartnershipSocietysDto } from './dto/update-partnership-societys.dto';
import { CreatePartnershipUsersDto } from "./dto/create-partnership-users.dto";
import { UpdatePartnershipUsersDto } from "./dto/update-partnership-users.dto";
import { RolesGuard } from "../roles/guards/roles.guard";
import { ComposeUserAuthGuard } from "../roles/guards/compose-user-auth.guard";

@Controller('partnerships')
export class PartnershipsController {
  constructor(private readonly partnershipsService: PartnershipsService) {}


  // ###################### CREATE ROUTE PART ######################

  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS, process.env.RESTAURANT_RIGHTS, process.env.DELIVER_RIGHTS]))
  @Post('societies')
  createSociety(@Body() createPartnershipSocietysDto: CreatePartnershipSocietysDto) {
    return this.partnershipsService.createSociety(createPartnershipSocietysDto);
  }


  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS, process.env.USER_RIGHTS]))
  @Post('users')
  createUser(@Body() createPartnershipUsersDto: CreatePartnershipUsersDto) {
    return this.partnershipsService.createUser(createPartnershipUsersDto);
  }


  // ###################### FIND ROUTE PART ######################

  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS, process.env.RESTAURANT_RIGHTS, process.env.DELIVER_RIGHTS]))
  @Get(':id/society/sponsor')
  findSocietySponsor(@Param('id') id: string) {
    return this.partnershipsService.findSocietySponsor(id);
  }

  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS, process.env.RESTAURANT_RIGHTS, process.env.DELIVER_RIGHTS]))
  @Get(':id/society/partner')
  findSocietyPartner(@Param('id') id: string) {
    return this.partnershipsService.findSocietyPartner(id);
  }

  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS, process.env.USER_RIGHTS]))
  @Get(':id/user/sponsor')
  findUserSponsor(@Param('id') id: string) {
    return this.partnershipsService.findUserSponsor(+id);
  }

  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS, process.env.USER_RIGHTS]))
  @Get(':id/user/partner')
  findUserPartner(@Param('id') id: string) {
    return this.partnershipsService.findUserPartner(+id);
  }


  // ###################### UPDATE ROUTE PART ######################

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [], [process.env.DELIVER_RIGHTS, process.env.RESTAURANT_RIGHTS]))
  @Patch(':id/society')
  updateSociety(@Param('id') id: string, @Body() updatePartnershipDto: UpdatePartnershipSocietysDto) {
    return this.partnershipsService.updateSociety(id, updatePartnershipDto);
  }

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [process.env.USER_RIGHTS, process.env.RESTAURANT_RIGHTS, process.env.DELIVER_RIGHTS], []))
  @Patch(':id/user')
  updateUser(@Param('id') id: string, @Body() updatePartnershipUsersDto: UpdatePartnershipUsersDto) {
    return this.partnershipsService.updateUser(id, updatePartnershipUsersDto);
  }


  // ###################### DELETE ROUTE PART ######################

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [], [process.env.DELIVER_RIGHTS, process.env.RESTAURANT_RIGHTS]))
  @Delete(':id/society')
  removeSociety(@Param('id') id: string) {
    return this.partnershipsService.removeSociety(id);
  }

  @UseGuards(new ComposeUserAuthGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS], [process.env.USER_RIGHTS, process.env.RESTAURANT_RIGHTS, process.env.DELIVER_RIGHTS], []))
  @Delete(':id/user')
  removeUser(@Param('id') id: string) {
    return this.partnershipsService.removeUser(id);
  }
}
