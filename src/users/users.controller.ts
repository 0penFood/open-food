import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UseGuards
} from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserSocietyDto } from "./dto/create-user-society.dto";
import { UpdateUserSocietiesDto } from "./dto/update-user-societies.dto";
import { CreateUserAddressDto } from "./dto/create-user-address.dto";
import { CreateUserBillingDto } from "./dto/create-user-billing.dto";
import { UpdateUserAddressDto } from "./dto/update-user-address.dto";
import { UpdateUserBillingDto } from "./dto/update-user-billing.dto";
import { RolesGuard } from "../roles/guards/roles.guard";
import { AccountScopeGuard } from "../roles/guards/account-scope.guard";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  // ################# CREATE ROUTE PART #################

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS, process.env.USER_RIGHTS]))
  @Post('society')
  createLinkSociety(@Body() createUserSocietyDto: CreateUserSocietyDto) {
    return this.usersService.createLinkSociety(createUserSocietyDto);
  }


  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS, process.env.USER_RIGHTS]))
  @Post('address')
  createAddress(@Body() createUserAddressDto: CreateUserAddressDto) {
    return this.usersService.createAddress(createUserAddressDto);
  }


  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS, process.env.USER_RIGHTS]))
  @Post('billing')
  createBilling(@Body() createUserBillingDto: CreateUserBillingDto) {
    return this.usersService.createBilling(createUserBillingDto);
  }


  // ################# FIND ROUTE PART #################

  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS]))
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS, process.env.USER_RIGHTS]))
  @Get(':id/address')
  findAllAddress(@Param('id') id: string) {
    return this.usersService.findAllAddress(+id);
  }



  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS]) || new AccountScopeGuard([process.env.USER_RIGHTS]))
  @Get(':id/billing')
  findAllBilling(@Param('id') id: string) {
    return this.usersService.findAllBilling(+id);
  }

  @Get(':id/USocieties')
  findAllLinkSocietiesUser(@Param('id') id: string) {
    return this.usersService.findAllLinkSocietiesUser(+id);
  }

  @Get(':id/SSocietes')
  findAllLinkSocietiesSociety(@Param('id') id: string) {
    return this.usersService.findAllLinkSocietiesSociety(+id);
  }

  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS]) || new AccountScopeGuard([process.env.USER_RIGHTS]))
  @Get('readByID/:id')
  findOneById(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS]) || new AccountScopeGuard([process.env.USER_RIGHTS]))
  @Get('readByEmail/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }


  // ################# UPDATE ROUTE PART #################


  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS]) || new AccountScopeGuard ([process.env.USER_RIGHTS]))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS]) || new AccountScopeGuard ([process.env.USER_RIGHTS]))
  @Patch(':id/society')
  updateLinkSociety(@Param('id') id: string, @Body() updateUserSocietiesDto: UpdateUserSocietiesDto) {
    return this.usersService.updateLinkSociety(+id, updateUserSocietiesDto);
  }

  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS]) || new AccountScopeGuard ([process.env.USER_RIGHTS]))
  @Patch(':id/address')
  updateAddress(@Param('id') id: string, @Body() updateUserAddressDto: UpdateUserAddressDto) {
    return this.usersService.updateAddress(+id, updateUserAddressDto);
  }

  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS]) || new AccountScopeGuard ([process.env.USER_RIGHTS]))
  @Patch(':id/billing')
  updateBilling(@Param('id') id: string, @Body() updateUserBillingDto: UpdateUserBillingDto) {
    return this.usersService.updateBilling(+id, updateUserBillingDto);
  }


  // ################# REMOVE ROUTE PART #################

  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS]) || new AccountScopeGuard ([process.env.USER_RIGHTS]))
  @Patch(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }


  // ################# DELETE ROUTE PART #################

  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS]) || new AccountScopeGuard ([process.env.USER_RIGHTS]))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }

  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS]) || new AccountScopeGuard ([process.env.USER_RIGHTS]))
  @Delete(':id/society')
  deleteLinkSociety(@Param('id') id: string) {
    return this.usersService.deleteLinkSociety(+id);
  }

  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS]) || new AccountScopeGuard ([process.env.USER_RIGHTS]))
  @Delete(':id/address')
  deleteAddress(@Param('id') id: string) {
    return this.usersService.deleteAddress(+id);
  }

  @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS, process.env.ADMIN_RIGHTS]) || new AccountScopeGuard ([process.env.USER_RIGHTS]))
  @Delete(':id/billing')
  deleteBilling(@Param('id') id: string) {
    return this.usersService.deleteBilling(+id);
  }
}
