import {ForbiddenException, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {PrismaClient} from '@prisma/client';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime';
import { Logger } from '../../helpers/logger'
import { CreateUserSocietyDto } from "./dto/create-user-society.dto";
import { UpdateUserSocietiesDto } from "./dto/update-user-societies.dto";
import { CreateUserBillingDto } from "./dto/create-user-billing.dto";
import { CreateUserAddressDto } from "./dto/create-user-address.dto";
import { UpdateUserAddressDto } from "./dto/update-user-address.dto";
import { UpdateUserBillingDto } from "./dto/update-user-billing.dto";

const prisma = new PrismaClient();

@Injectable()
export class UsersService {

  // Create Function Part
  async create(createUserDto: CreateUserDto) {
    prisma.$connect();
    try
    {
      await prisma.users.create({data: createUserDto})
      const getCreatedUser = await this.findOneByEmail(createUserDto.email);
      prisma.$disconnect();
      await Logger.infoLog('api', 'User with id '+getCreatedUser.id+' created');
      return {
        id: getCreatedUser.id,
        email: getCreatedUser.email,
        where: {
          isValid: true,
        }
      };
    }
    catch (e)
    {
      if(e instanceof PrismaClientKnownRequestError)
      {
        if(e.code === 'P2002')
        {
          prisma.$disconnect();
          await Logger.errorLog('api', 'Attempt to create a user with an already used email');
          throw new ForbiddenException('Error : Email is already used');
        }
      }
      prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async createLinkSociety(createUserSocietyDto: CreateUserSocietyDto) {
    prisma.$connect();
    try
    {
      if(createUserSocietyDto.fk_society != 0 && createUserSocietyDto.fk_user != 0)
      {
        await prisma.userHasSociety.create({data: createUserSocietyDto})
        prisma.$disconnect();
        await Logger.infoLog('api', 'User with id ' + createUserSocietyDto.fk_user + ' is link to Society with id ' + createUserSocietyDto.fk_society + ' created');
        return {
          message : 'User link created'
        };
      }
      else {
        prisma.$disconnect();
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
          prisma.$disconnect();
          await Logger.errorLog('api', 'r: user/createUserHasSociety -> Error: ID Society or ID User provided not exists');
          throw new ForbiddenException('Error : ID Society or ID User not exists');
        }
      }
      prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async createBilling(createUserBillingDto: CreateUserBillingDto) {
    prisma.$connect();
    try
    {
      if(createUserBillingDto.fk_user != 0)
      {
        await prisma.userHasBilling.create({data: createUserBillingDto})
        prisma.$disconnect();
        await Logger.infoLog('api', 'Billing link to User with id ' + createUserBillingDto.fk_user + ' is created');
        return {
          message : 'Billing link created'
        };
      }
      else {
        prisma.$disconnect();
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
          await Logger.errorLog('api', 'r: user/createUserHasBilling -> Error: ID User provided not exists');
          throw new ForbiddenException('Error : ID User not exists');
        }
      }
      prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async createAddress(createUserAddressDto: CreateUserAddressDto) {
    prisma.$connect();
    try
    {
      if(createUserAddressDto.fk_user != 0)
      {
        await prisma.userHasAdress.create({data: createUserAddressDto})
        prisma.$disconnect();
        await Logger.infoLog('api', 'Address link to User with id ' + createUserAddressDto.fk_user + ' is created');
        return {
          message : 'Address link created'
        };
      }
      else {
        prisma.$disconnect();
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


  // Find All Function Part
  async findAll() {
    prisma.$connect();
    const allUsers = await prisma.users.findMany();
    prisma.$disconnect();
    let users = {};
    allUsers.forEach(user => {
    users[user.id] = {
      name: user.firstName + '_' + user.lastName,
      email: user.email,
      phone: user.phone,
      where: {
        isValid: true,
      }
    }
    })
    await Logger.infoLog('api', 'All users have been read');
    return users;
  }

  async findAllAddress(id: number) {
    prisma.$connect();
    const allAddress = await prisma.userHasAdress.findMany({where: {
      fk_user: id
      }});
    prisma.$disconnect();
    let address = {};

    allAddress.forEach(addresss => {
      address[addresss.id] = {
        id: addresss.id,
        id_user: id,
        address: addresss.address,
        where: {
          isValid: true,
        }
      }
    })
    await Logger.infoLog('api', 'All address link to User with id ' + id + ' have been read');
    return address;
  }

  async findAllBilling(id: number) {
    prisma.$connect();
    const allBilling= await prisma.userHasBilling.findMany({where: {
        fk_user: id
      }});
    prisma.$disconnect();
    let billings = {};

    allBilling.forEach(billing => {
      billings[billing.id] = {
        id: billing.id,
        id_user: id,
        billing: billing.billing,
        where: {
          isValid: true,
        }
      }
    })
    await Logger.infoLog('api', 'All billing link to User with id ' + id + ' have been read');
    return billings;
  }

  async findAllLinkSocietiesUser(id: number) {
    prisma.$connect();

    const allUserSociety = await prisma.userHasSociety.findMany({where: {
      fk_user : id
      }});

    prisma.$disconnect();
    let societies = {};

    allUserSociety.forEach(userSociety => {
      societies[userSociety.id] = {
        user_id: userSociety.fk_user,
        society_id: userSociety.fk_society,
        where: {
          isValid: true,
        }
      }
    })
    await Logger.infoLog('api', 'All societies link to user with id ' + id + ' have been read');
    return societies;
  }

  async findAllLinkSocietiesSociety(id: number) {
    prisma.$connect();

    const allUserSociety = await prisma.userHasSociety.findMany({where: {
      fk_society : id
      }});

    prisma.$disconnect();
    let users = {};

    allUserSociety.forEach(userSociety => {
      users[userSociety.id] = {
        user_id: userSociety.fk_user,
        society_id: userSociety.fk_society,
        where: {
          isValid: true,
        }
      }
    })
    await Logger.infoLog('api', 'All users link to society with id ' + id + ' have been read');
    return users;
  }


  // Find Unique Function Part
  async findOneById(id: number) {
    prisma.$connect();
    const User = await prisma.users.findUnique({where: {
        id: id,
      },});
    prisma.$disconnect();
    await Logger.infoLog('api', 'User with id '+id+' read');
    return {
        id: User.id,
        email: User.email,
        name: User.firstName + '_' + User.lastName,
        phone: User.phone,
        isValid: User.isValid,
        where: {
          isValid: true,
        }
    };
  }

  async findOneByEmail(email: string) {
    prisma.$connect();
    const User = await prisma.users.findUnique({where: {
        email: email,
      },});
    prisma.$disconnect();
    await Logger.infoLog('api', 'User with email '+email+' read');
    return {
      id: User.id,
      email: User.email,
      name: User.firstName + '_' + User.lastName,
      phone: User.phone,
      where: {
        isValid: true,
      }
    };
  }


  // Update Function Part
  async update(id: number, updateUserDto: UpdateUserDto) {
    prisma.$connect();
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
        const getUpdatedUser = await this.findOneById(id);
        prisma.$disconnect();
        await Logger.infoLog('api', 'User with id '+id+' updated');
        return {
          id: getUpdatedUser.id,
          email: getUpdatedUser.email,
          name: getUpdatedUser.name,
          phone: getUpdatedUser.phone,
          idValid: getUpdatedUser.isValid,
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
      prisma.$disconnect();
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
    prisma.$connect();
    try
    {
      await prisma.userHasSociety.update({
        data: updateUserSocietiesDto,
        where: { id: id }
      });

      prisma.$disconnect();
      await Logger.infoLog('api', 'LinkSociety with id ' + id + ' updated' );
      return {
        message : 'LinkSociety with id ' + id + ' updated'
      };
    }
    catch (e)
    {
      prisma.$disconnect();
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
    prisma.$connect();
    try
    {
      await prisma.userHasAdress.update({
        data: updateUserAddressDto,
        where: { id: id }
      });

      prisma.$disconnect();
      await Logger.infoLog('api', 'Address with id ' + id + ' updated' );
      return {
        message : 'Address with id ' + id + ' updated'
      };
    }
    catch (e)
    {
      prisma.$disconnect();
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
    prisma.$connect();
    try
    {
      await prisma.userHasBilling.update({
        data: updateUserBillingDto,
        where: { id: id }
      });

      prisma.$disconnect();
      await Logger.infoLog('api', 'Billing with id ' + id + ' updated' );
      return {
        message : 'Billing with id ' + id + ' updated'
      };
    }
    catch (e)
    {
      prisma.$disconnect();
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


  // Delete Function Part
  async delete(id: number) {
    prisma.$connect();
    try
    {
      await prisma.users.delete({
        where: {
          id: id
        }
      });
      prisma.$disconnect();
      await Logger.infoLog('api', 'User with id '+id+' deleted');
      return 'This action removes a '+String(id)+' user';
    }
    catch (e)
    {
      if(e instanceof PrismaClientKnownRequestError)
      {
        if(e.code === 'P2003')
        {
          prisma.$disconnect();
          await Logger.errorLog('api', 'Foreign key constraints failed delete');
          throw new ForbiddenException('Error: Foreign key constraints failed delete');
        }
      }
      prisma.$disconnect();
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
    prisma.$connect();
    try
    {
      await prisma.userHasAdress.delete({
        where: {
          id: id
        }
      });
      prisma.$disconnect();
      await Logger.infoLog('api', 'Address with id ' + id + ' deleted');
      return 'This action removes a ' + String(id) + ' Address';
    }
    catch (e)
    {
      prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async deleteBilling(id: number) {
    prisma.$connect();
    try
    {
      await prisma.userHasBilling.delete({
        where: {
          id: id
        }
      });
      prisma.$disconnect();
      await Logger.infoLog('api', 'Billing with id ' + id + ' deleted');
      return 'This action removes a ' + String(id) + ' Billing';
    }
    catch (e)
    {
      prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  // Remove Function Part
  async remove(id: number) {
    prisma.$connect();
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
      prisma.$disconnect();
      await Logger.infoLog('api', 'User with id '+String(id)+' removed');
      return 'User with id '+String(id)+' removed';
    }
    catch (e)
    {
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
