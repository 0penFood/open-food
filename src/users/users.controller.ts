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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('createLinkSociety')
  createLinkSociety(@Body() createUserSocietyDto: CreateUserSocietyDto) {
    return this.usersService.createLinkSociety(createUserSocietyDto);
  }

  @Get('readAll')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('readAllLinkSocietiesByUser/:id')
  findAllLinkSocietiesUser(@Param('id') id: string) {
    return this.usersService.findAllLinkSocietiesUser(+id);
  }

  @Get('readAllLinkSocietiesBySociety/:id')
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

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch('updateLinkSociety/:id')
  updateLinkSociety(@Param('id') id: string, @Body() updateUserSocietiesDto: UpdateUserSocietiesDto) {
    return this.usersService.updateLinkSociety(+id, updateUserSocietiesDto);
  }

  @Patch('remove/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }

  @Delete('delete/:id')
  deleteLinkSociety(@Param('id') id: string) {
    return this.usersService.deleteLinkSociety(+id);
  }
}
