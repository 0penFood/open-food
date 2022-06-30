import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@internal/prisma/client';
import { CreatePartnershipSocietysDto } from './dto/create-partnership-societys.dto';
import { UpdatePartnershipSocietysDto } from './dto/update-partnership-societys.dto';
import { CreatePartnershipUsersDto } from "./dto/create-partnership-users.dto";
import { UpdatePartnershipUsersDto } from "./dto/update-partnership-users.dto";
import { Logger } from "../../helpers/logger";

const prisma2 = new PrismaClient()

@Injectable()
export class PartnershipsService {
  
  // ###################### CREATE FUNCTION PART ######################
  
  async createSociety(createPartnershipSocietysDto: CreatePartnershipSocietysDto) {
    await prisma2.$connect();
    try
    {
      await prisma2.patnershipSocieties.create({data: createPartnershipSocietysDto});
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Society with id ' + createPartnershipSocietysDto.partnerSociety + ' sponsored restaurant with id ' + createPartnershipSocietysDto.sponsorSociety);
      return {
        message: 'Society with id ' + createPartnershipSocietysDto.partnerSociety + ' sponsored restaurant with id ' + createPartnershipSocietysDto.sponsorSociety,
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : ' + e.message);
      throw e;
    }
  }

  async createUser(createPartnershipUsersDto: CreatePartnershipUsersDto) {
    await prisma2.$connect();
    try
    {
      await prisma2.patnershipUsers.create({data: createPartnershipUsersDto});
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'User with id ' + createPartnershipUsersDto.partnerUser + ' sponsored User with id ' + createPartnershipUsersDto.sponsorUser);
      return {
        message: 'User with id ' + createPartnershipUsersDto.partnerUser + ' sponsored User with id ' + createPartnershipUsersDto.sponsorUser,
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : ' + e.message);
      throw e;
    }
  }

  
  // ###################### FIND FUNCTION PART ######################

  async findSocietySponsor(id: string) {
    await prisma2.$connect();
    try
    {
      const allSocietiesPartner = await prisma2.patnershipSocieties.findMany({
        where:{
          AND:[
            {
              sponsorSociety: id
            },
            {
              isValid: true
            }
          ]
        }});
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Recover all societies Partner for id restaurant ' + id );

      return await this.concatDataSocieties(allSocietiesPartner);
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async findSocietyPartner(id: string) {
    await prisma2.$connect();
    try
    {
      const allSocietiesSponsor = await prisma2.patnershipSocieties.findMany({
        where:{
          AND:[
            {
              partnerSociety: id
            },
            {
              isValid: true
            }
          ]
        }});
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Recover all societies Sponsor for id restaurant ' + id );

      return await this.concatDataSocieties(allSocietiesSponsor);
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async concatDataSocieties(societiesArray: any)
  {
    let societies = {};
    societiesArray.forEach(society => {
      societies[society.id] = {
        sponsorSociety:           society.sponsorSociety,
        partnerSociety:           society.partnerSociety,
      }
    });
    return societies;
  }

  async findUserSponsor(id: number) {
    await prisma2.$connect();
    try
    {
      const allUsersPartner = await prisma2.patnershipUsers.findMany({
        where:{
          AND:[
            {
              sponsorUser: id
            },
            {
              isValid: true
            }
          ]
        }});
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Recover all users Partner for id user ' + id );

      return await this.concatDataUsers(allUsersPartner);
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async findUserPartner(id: number) {
    await prisma2.$connect();
    try
    {
      const allUsersSponsor = await prisma2.patnershipUsers.findMany({
        where:{
          AND:[
            {
              partnerUser: id
            },
            {
              isValid: true
            }
          ]
        }});
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Recover all users Sponsor for id user ' + id );

      return await this.concatDataUsers(allUsersSponsor);
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async concatDataUsers(usersArray: any)
  {
    let users = {};
    usersArray.forEach(user => {
      users[user.id] = {
        sponsorUser:           user.sponsorUser,
        partnerUser:           user.partnerUser,
      }
    });
    return users;
  }


  // ###################### UPDATE FUNCTION PART ######################
  
  async updateSociety(id: string, updatePartnershipDto: UpdatePartnershipSocietysDto) {
    await prisma2.$connect();
    try
    {
      await prisma2.patnershipSocieties.update({
        where:{
          id: id
        },
        data: updatePartnershipDto
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Partner society with id ' + id + ' modificated ');
      return {
        message: 'Partner society with id ' + id + ' modificated ',
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : ' + e.message);
      throw e;
    }
  }

  async updateUser(id: string, updatePartnershipUsersDto: UpdatePartnershipUsersDto) {
    await prisma2.$connect();
    try
    {
      await prisma2.patnershipUsers.update({
        where:{
          id: id
        },
        data: updatePartnershipUsersDto
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Partner User with id ' + id + ' modificated ');
      return {
        message: 'Partner User with id ' + id + ' modificated ',
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : ' + e.message);
      throw e;
    }
  }


  // ###################### DELETE FUNCTION PART ######################
  
  async removeSociety(id: string) {
    await prisma2.$connect();
    try
    {
      await prisma2.patnershipSocieties.update({
        where: {
          id: id
        },
        data:{
          isValid: false
        }
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Partner society with id ' + id + ' disabled');

      return {
        message: 'Partner society with id ' + id + ' disabled',
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async removeUser(id: string) {
    await prisma2.$connect();
    try
    {
      await prisma2.patnershipUsers.update({
        where: {
          id: id
        },
        data:{
          isValid: false
        }
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Partner user with id ' + id + ' disabled');

      return {
        message: 'Partner user with id ' + id + ' disabled',
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }
}
