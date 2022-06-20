import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserSocietyDto } from "./dto/create-user-society.dto";
import { UpdateUserSocietiesDto } from "./dto/update-user-societies.dto";
import { CreateUserAddressDto } from "./dto/create-user-address.dto";
import { CreateUserBillingDto } from "./dto/create-user-billing.dto";
import { UpdateUserAddressDto } from "./dto/update-user-address.dto";
import { UpdateUserBillingDto } from "./dto/update-user-billing.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create Links Part
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('society')
  createLinkSociety(@Body() createUserSocietyDto: CreateUserSocietyDto) {
    return this.usersService.createLinkSociety(createUserSocietyDto);
  }

  @Post('address')
  createAddress(@Body() createUserAddressDto: CreateUserAddressDto) {
    return this.usersService.createAddress(createUserAddressDto);
  }

  @Post('billing')
  createBilling(@Body() createUserBillingDto: CreateUserBillingDto) {
    return this.usersService.createBilling(createUserBillingDto);
  }


  // Read Links Part
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id/address')
  findAllAddress(@Param('id') id: string) {
    return this.usersService.findAllAddress(+id);
  }

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

  @Get('readByID/:id')
  findOneById(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @Get('readByEmail/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }


  // Update Links Part
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch(':id/society')
  updateLinkSociety(@Param('id') id: string, @Body() updateUserSocietiesDto: UpdateUserSocietiesDto) {
    return this.usersService.updateLinkSociety(+id, updateUserSocietiesDto);
  }


  @Patch(':id/address')
  updateAddress(@Param('id') id: string, @Body() updateUserAddressDto: UpdateUserAddressDto) {
    return this.usersService.updateAddress(+id, updateUserAddressDto);
  }

  @Patch(':id/billing')
  updateBilling(@Param('id') id: string, @Body() updateUserBillingDto: UpdateUserBillingDto) {
    return this.usersService.updateBilling(+id, updateUserBillingDto);
  }

  // Remove Links Part
  @Patch(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }


  // Delete Links Part
  @Delete(':id/del')
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }

  @Delete(':id/society')
  deleteLinkSociety(@Param('id') id: string) {
    return this.usersService.deleteLinkSociety(+id);
  }

  @Delete(':id/address')
  deleteAddress(@Param('id') id: string) {
    return this.usersService.deleteAddress(+id);
  }

  @Delete(':id/billing')
  deleteBilling(@Param('id') id: string) {
    return this.usersService.deleteBilling(+id);
  }
}
