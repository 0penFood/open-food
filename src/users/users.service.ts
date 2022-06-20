import {ForbiddenException, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {PrismaClient} from '@prisma/client';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime';
import { Logger } from '../../helpers/logger'

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
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
    }
    })
    await Logger.infoLog('api', 'All users have been read');
    return users;
  }

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
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    prisma.$connect();
    try
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
      };
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
