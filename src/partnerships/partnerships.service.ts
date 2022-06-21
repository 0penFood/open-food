import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@internal/prisma/client';
import { CreatePartnershipSocietysDto } from './dto/create-partnership-societys.dto';
import { UpdatePartnershipSocietysDto } from './dto/update-partnership-societys.dto';
import { CreatePartnershipUsersDto } from "./dto/create-partnership-users.dto";
import { UpdatePartnershipUsersDto } from "./dto/update-partnership-users.dto";

const prisma2 = new PrismaClient()

@Injectable()
export class PartnershipsService {
  
  // ###################### CREATE FUNCTION PART ######################
  
  async createSociety(createPartnershipSocietysDto: CreatePartnershipSocietysDto) {
    await prisma2.$connect();
    await prisma2.patnershipSocieties.create({data: createPartnershipSocietysDto});
    await prisma2.$disconnect();
    return 'This action adds a new partnership Society';
  }

  async createUser(createPartnershipUsersDto: CreatePartnershipUsersDto) {
    await prisma2.$connect();
    await prisma2.patnershipUsers.create({data: createPartnershipUsersDto});
    await prisma2.$disconnect();
    return 'This action adds a new partnership Users';
  }

  
  // ###################### FIND FUNCTION PART ######################
  
  findAll() {
    return `This action returns all partnerships`;
  }

  async findSocietySponsor(id: string) {
    await prisma2.$connect();
    const allSocietiesPatner = await prisma2.patnershipSocieties.findMany({
      where:{
        sponsorSociety: id
      }});
    await prisma2.$disconnect();
    console.log(allSocietiesPatner);

    return `This action returns societies who is sponsor by society with id: ${id}`;
  }

  async findSocietyPartner(id: string) {
    await prisma2.$connect();
    const allSocietiesSponsor = await prisma2.patnershipSocieties.findMany({
      where:{
        partnerSociety: id
      }});
    await prisma2.$disconnect();
    console.log(allSocietiesSponsor);

    return `This action returns societies who is partner by society with id: ${id}`;
  }

  async findUserSponsor(id: number) {
    await prisma2.$connect();
    const allUsersPartner = await prisma2.patnershipUsers.findMany({
      where:{
        sponsorUser: id
      }});
    await prisma2.$disconnect();
    console.log(allUsersPartner);

    return `This action returns a #${id} partnership`;
  }

  async findUserPartner(id: number) {
    await prisma2.$connect();
    const allUsersSponsor = await prisma2.patnershipUsers.findMany({
      where:{
        partnerUser: id
      }});
    await prisma2.$disconnect();
    console.log(allUsersSponsor);

    return `This action returns a #${id} partnership`;
  }


  // ###################### UPDATE FUNCTION PART ######################
  
  async updateSociety(id: string, updatePartnershipDto: UpdatePartnershipSocietysDto) {
    await prisma2.$connect();
    await prisma2.patnershipSocieties.update({
      where:{
        id: id
      },
    data:updatePartnershipDto
    });
    await prisma2.$disconnect();

    return `This action updates a #${id} partnership`;
  }

  async updateUser(id: string, updatePartnershipUsersDto: UpdatePartnershipUsersDto) {
    await prisma2.$connect();
    await prisma2.patnershipUsers.update({
      where:{
        id: id
      },
      data:updatePartnershipUsersDto
    });
    await prisma2.$disconnect();
    return `This action updates a #${id} partnership`;
  }



  // ###################### DELETE FUNCTION PART ######################
  
  async removeSociety(id: string) {
    await prisma2.$connect();
    await prisma2.patnershipSocieties.update({
      where:{
        id: id
      },
      data:{
        isValid: false
      }
    });
    await prisma2.$disconnect();
    return `This action removes a #${id} partnership`;
  }

  async removeUser(id: string) {
    await prisma2.$connect();
    await prisma2.patnershipUsers.update({
      where:{
        id: id
      },
      data:{
        isValid: false
      }
    });
    await prisma2.$disconnect();
    return `This action removes a #${id} partnership`;
  }
}
