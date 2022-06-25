import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Logger } from '../../helpers/logger'
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import { CreateUserSocietyDto } from "./dto/create-user-society.dto";
import { UpdateUserSocietiesDto } from "./dto/update-user-societies.dto";
import { CreateUserBillingDto } from "./dto/create-user-billing.dto";
import { CreateUserAddressDto } from "./dto/create-user-address.dto";
import { UpdateUserAddressDto } from "./dto/update-user-address.dto";
import { UpdateUserBillingDto } from "./dto/update-user-billing.dto";

const prisma = new PrismaClient();

@Injectable()
export class UsersService {


  // ######################### CREATE FUNCTION PART #########################

  async create(createUserDto: CreateUserDto) {
    await prisma.$connect();
    try
    {
      await prisma.users.create({data: createUserDto});
      await prisma.$disconnect();
      await Logger.infoLog('api', 'User with name "'+createUserDto.firstName + '_' + createUserDto.lastName + '" created');

      return {
        message: 'User with name "'+createUserDto.firstName + '_' + createUserDto.lastName + '" created',
      };
    }
    catch (e)
    {
      if(e instanceof PrismaClientKnownRequestError)
      {
        if(e.code === 'P2002')
        {
          await prisma.$disconnect();
          await Logger.errorLog('api', 'Attempt to create a user with an already used email');
          throw new ForbiddenException('Error : Email is already used');
        }
      }
      await prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async createLinkSociety(createUserSocietyDto: CreateUserSocietyDto) {
    await prisma.$connect();
    try
    {
      if(createUserSocietyDto.fk_society != 0 && createUserSocietyDto.fk_user != 0)
      {
        await prisma.userHasSociety.create({data: createUserSocietyDto})
        await prisma.$disconnect();
        await Logger.infoLog('api', 'User with id ' + createUserSocietyDto.fk_user + ' is link to Society with id ' + createUserSocietyDto.fk_society + ' created');
        return {
          message : 'User link created'
        };
      }
      else {
        await prisma.$disconnect();
        await Logger.infoLog('api', ' ID User Or Society not found');
        return {
          message : 'Error: ID User Or Society not found'
        };
      }
    }
    catch (e)
    {
      if(e instanceof PrismaClientKnownRequestError)
      {
        if(e.code === 'P2003')
        {
          await prisma.$disconnect();
          await Logger.errorLog('api', 'r: user/createUserHasSociety -> Error: ID Society or ID User provided not exists');
          throw new ForbiddenException('Error : ID Society or ID User not exists');
        }
      }
      await prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async createBilling(createUserBillingDto: CreateUserBillingDto) {
    await prisma.$connect();
    try
    {
      if(createUserBillingDto.fk_user != 0)
      {
        await prisma.userHasBilling.create({data: createUserBillingDto})
        await prisma.$disconnect();
        await Logger.infoLog('api', 'Billing link to User with id ' + createUserBillingDto.fk_user + ' is created');
        return {
          message : 'Billing link created'
        };
      }
      else {
        await prisma.$disconnect();
        await Logger.infoLog('api', ' ID User not found');
        return {
          message : 'Error: ID User not found'
        };
      }
    }
    catch (e)
    {
      if(e instanceof PrismaClientKnownRequestError)
      {
        if(e.code === 'P2003')
        {
          await prisma.$disconnect();
          await Logger.errorLog('api', 'r: user/createUserHasBilling -> Error: ID User provided not exists');
          throw new ForbiddenException('Error : ID User not exists');
        }
      }
      await prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async createAddress(createUserAddressDto: CreateUserAddressDto) {
    await prisma.$connect();
    try
    {
      if(createUserAddressDto.fk_user != 0)
      {
        await prisma.userHasAdress.create({data: createUserAddressDto})
        await prisma.$disconnect();
        await Logger.infoLog('api', 'Address link to User with id ' + createUserAddressDto.fk_user + ' is created');
        return {
          message : 'Address link created'
        };
      }
      else {
        await prisma.$disconnect();
        await Logger.infoLog('api', ' ID User not found');
        return {
          message : 'Error: ID User not found'
        };
      }
    }
    catch (e)
    {
      if(e instanceof PrismaClientKnownRequestError)
      {
        if(e.code === 'P2003')
        {
          prisma.$disconnect();
          await Logger.errorLog('api', 'r: user/createUserHasAddress -> Error: ID User provided not exists');
          throw new ForbiddenException('Error : ID User not exists');
        }
      }
      prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }


  // ######################### FIND FUNCTION PART #########################

  async findAll() {
    await prisma.$connect();
    try
    {
      const allUsers = await prisma.users.findMany({
        where: {
          isValid: true,
        }});

      await prisma.$disconnect();
      await Logger.infoLog('api', 'All users have been read');

      return await this.concatData(allUsers, 1);
    }
    catch (e)
    {
      await prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async findAllAddress(id: number) {
    await prisma.$connect();
    try
    {
      const allAddress = await prisma.userHasAdress.findMany({
        where:{
          AND: [{
            fk_user: id,
          },
            {
              isValid: true,
            },
          ]}});
      prisma.$disconnect();

      await prisma.$disconnect();
      await Logger.infoLog('api', 'All address link to User with id ' + id + ' have been read');
      return await this.concatData(allAddress, 2);
    }
    catch (e)
    {
      await prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async findAllBilling(id: number) {
    await prisma.$connect();
    try
    {
      const allBilling= await prisma.userHasBilling.findMany({
        where:{
          AND: [{
            fk_user: id,
          },
            {
              isValid: true,
            },
          ]}});

      await prisma.$disconnect();
      await Logger.infoLog('api', 'All billing link to User with id ' + id + ' have been read');
      return await this.concatData(allBilling, 3);
    }
    catch (e)
    {
      await prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async findAllLinkSocietiesUser(id: number) {
    await prisma.$connect();
    try
    {
      const allUserSociety= await prisma.userHasSociety.findMany({
        where:{
          AND: [{
            fk_user: id,
          },
            {
              isValid: true,
            },
          ]}});

      await prisma.$disconnect();
      await Logger.infoLog('api', 'All societies link to user with id ' + id + ' have been read');
      return await this.concatData(allUserSociety, 4);
    }
    catch (e)
    {
      await prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async findAllLinkSocietiesSociety(id: number){
    await prisma.$connect();
    try
    {
      const allUserSociety= await prisma.userHasSociety.findMany({
        where:{
          AND: [{
            fk_society: id,
          },
            {
              isValid: true,
            },
          ]}});

      await prisma.$disconnect();
      await Logger.infoLog('api', 'All users link to society with id ' + id + ' have been read');
      return await this.concatData(allUserSociety, 4);
    }
    catch (e)
    {
      await prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async findUserAdm(email: string) {
    await prisma.$connect();

    if(email)
    {
      try {
        const User = await prisma.users.findUnique(
          {
            where:{
              email: email,
            },
          }
        );
        await prisma.$disconnect();
        return User;
      }
      catch (e) {
        if(e instanceof PrismaClientKnownRequestError)
        {
          if(e.code === 'P2002')
          {
            await prisma.$disconnect();
            await Logger.errorLog('api', 'Try access User -> No found Email');
            //throw new UnauthorizedException('Error : Try access User -> No found Email');
          }
        }
        await prisma.$disconnect();
        await Logger.errorLog('api', 'Error : '+e.message);
        throw e;
      }
    }
    else {
      await Logger.errorLog('api', 'Try access User -> No found Email');
      await prisma.$disconnect();
    }
  }

  async findOneById(id: number) {
    await prisma.$connect();
    try
    {
      const User = await prisma.users.findUnique({
        where: {
          id: id,
        },
      });

      await prisma.$disconnect();
      await Logger.infoLog('api', 'User with id '+id+' read');
      return await this.concatData(User, 1);
    }
    catch (e)
    {
      await prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async findOneByEmail(email: string) {
    await prisma.$connect();
    try
    {
      const User = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });

      await prisma.$disconnect();
      await Logger.infoLog('api', 'User with email ' + email + ' read');
      return await this.concatData(User, 1);
    }
    catch (e)
    {
      await prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async concatData(usersArray: any, type: number) : Promise<JSON>
  {
    let users = {};

    if(type == 4)
    {
      usersArray.forEach(userSociety => {
        users[userSociety.id] = {
          user_id:    userSociety.fk_user,
          society_id: userSociety.fk_society,
        }
      });
      return JSON.parse(JSON.stringify(users));
    }
    switch(type)
    {
      case 1:
        usersArray.forEach(user => {
          users[user.id] = {
            idUser: user.id,
            name: user.firstName + '_' + user.lastName,
            email: user.email,
            phone: user.phone,
          }
        });
        break;

      case 2:
        usersArray.forEach(addresss => {
          users[addresss.id] = {
            id: addresss.id,
            id_user: addresss.id_user,
            address: addresss.address,
          }
        });
        break;

      case 3:
        usersArray.forEach(billing => {
          users[billing.id] = {
            id: billing.id,
            id_user: billing.id_user,
            billing: billing.billing,
          }
        });
        break;

      case 4:
        usersArray.forEach(userSociety => {
          let rtn2 = {
            user_id: userSociety.fk_user,
            society_id: userSociety.fk_society,
          };

          users[userSociety.id] = rtn2;
        });
        break;

      case 5:
        usersArray.forEach(userSociety => {
          users[userSociety.id] = {
            user_id:    userSociety.fk_user,
            society_id: userSociety.fk_society,
          }
        });
        break;
    }

    //userJson = <JSON>users;

    //userJson.push();
    return JSON.parse(JSON.stringify(users));
  }


  // ######################### UPDATE FUNCTION PART #########################

  async update(id: number, updateUserDto: UpdateUserDto) {
    await prisma.$connect();
    try
    {
      if(id != null)
      {
        await prisma.users.update({
          data: updateUserDto,
          where: {
            id: id,
          },
        });
        await prisma.$disconnect();
        await Logger.infoLog('api', 'User with id '+id+' updated');

        return {
          message: 'User with id ' + id + ' modificated ',
        };
      }
      else
      {
        await Logger.infoLog('api', 'User with id ' + id + ' not Found');
        return {
          message : 'No ID found'
        };
      }
    }
    catch (e)
    {
      await prisma.$disconnect();
      if(e instanceof PrismaClientKnownRequestError)
      {
        if(e.code === 'P2002')
        {
          await Logger.errorLog('api', 'Attempt to update a user with an already used email');
          throw new ForbiddenException('Email is already used');
        }
      }
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async updateLinkSociety(id: number, updateUserSocietiesDto: UpdateUserSocietiesDto) {
    await prisma.$connect();
    try
    {
      await prisma.userHasSociety.update({
        data: updateUserSocietiesDto,
        where: { id: id }
      });

      await prisma.$disconnect();
      await Logger.infoLog('api', 'LinkSociety with id ' + id + ' updated' );
      return {
        message : 'LinkSociety with id ' + id + ' updated'
      };
    }
    catch (e)
    {
      await prisma.$disconnect();
      if(e instanceof PrismaClientKnownRequestError)
      {
        if(e.code === 'P2003')
        {
          await Logger.errorLog('api', 'Attempt to update a LinkSociety with an id not existing');
          throw new ForbiddenException('ID Society or ID User not existing');
        }
      }
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }

  }

  async updateAddress(id: number, updateUserAddressDto: UpdateUserAddressDto) {
    await prisma.$connect();
    try
    {
      await prisma.userHasAdress.update({
        data: updateUserAddressDto,
        where: { id: id }
      });

      await prisma.$disconnect();
      await Logger.infoLog('api', 'Address with id ' + id + ' updated' );
      return {
        message : 'Address with id ' + id + ' updated'
      };
    }
    catch (e)
    {
      await prisma.$disconnect();
      if(e instanceof PrismaClientKnownRequestError)
      {
        if(e.code === 'P2003')
        {
          await Logger.errorLog('api', 'Attempt to update a Address with an id not existing');
          throw new ForbiddenException('ID address not existing');
        }
      }
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async updateBilling(id: number, updateUserBillingDto: UpdateUserBillingDto) {
    await prisma.$connect();
    try
    {
      await prisma.userHasBilling.update({
        data: updateUserBillingDto,
        where: { id: id }
      });

      await prisma.$disconnect();
      await Logger.infoLog('api', 'Billing with id ' + id + ' updated' );
      return {
        message : 'Billing with id ' + id + ' updated'
      };
    }
    catch (e)
    {
      await prisma.$disconnect();
      if(e instanceof PrismaClientKnownRequestError)
      {
        if(e.code === 'P2003')
        {
          await Logger.errorLog('api', 'Attempt to update a Billing with an id not existing');
          throw new ForbiddenException('ID Billing not existing');
        }
      }
      await Logger.errorLog('api', 'Error : '+ e.message);
      throw e;
    }
  }



  // ######################### DELETE FUNCTION PART #########################

  async delete(id: number) {
    await prisma.$connect();
    try
    {
      await prisma.users.delete({
        where: {
          id: id
        }
      });
      await prisma.$disconnect();
      await Logger.infoLog('api', 'User with id '+id+' deleted');
      return 'This action removes a '+String(id)+' user';
    }
    catch (e)
    {
      if(e instanceof PrismaClientKnownRequestError)
      {
        if(e.code === 'P2003')
        {
          await prisma.$disconnect();
          await Logger.errorLog('api', 'Foreign key constraints failed delete');
          throw new ForbiddenException('Error: Foreign key constraints failed delete');
        }
      }
      await prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async deleteLinkSociety(id: number) {
    prisma.$connect();
    try
    {
      await prisma.userHasSociety.delete({
        where: {
          id: id
        }
      });
      prisma.$disconnect();
      await Logger.infoLog('api', 'LinkSociety with id ' + id + ' deleted');
      return 'This action removes a ' + String(id) + ' LinkSociety';
    }
    catch (e)
    {
      prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async deleteAddress(id: number) {
    await prisma.$connect();
    try
    {
      await prisma.userHasAdress.delete({
        where: {
          id: id
        }
      });
      await prisma.$disconnect();
      await Logger.infoLog('api', 'Address with id ' + id + ' deleted');
      return 'This action removes a ' + String(id) + ' Address';
    }
    catch (e)
    {
      await prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async deleteBilling(id: number) {
    await prisma.$connect();
    try
    {
      await prisma.userHasBilling.delete({
        where: {
          id: id
        }
      });
      await prisma.$disconnect();
      await Logger.infoLog('api', 'Billing with id ' + id + ' deleted');
      return 'This action removes a ' + String(id) + ' Billing';
    }
    catch (e)
    {
      await prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }


  // ######################### REMOVE FUNCTION PART #########################

  async remove(id: number) {
    await prisma.$connect();
    try
    {
      await prisma.users.update({
        data: {
          isValid : false,
        },
        where: {
          id: id,
        },
      });
      await prisma.$disconnect();
      await Logger.infoLog('api', 'User with id '+String(id)+' disabled');
      return 'User with id '+String(id)+' disabled';
    }
    catch (e)
    {
      prisma.$disconnect();
      prisma.$disconnect();
      if(e instanceof PrismaClientKnownRequestError)
      {
        if(e.code === 'P2002')
        {
          await Logger.errorLog('api', 'Attempt to remove a user with an already used email');
          throw new ForbiddenException('Email is already used');
        }
      }
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }
}
