import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    prisma.$connect();
    try
    {
      await prisma.users.create({data: createUserDto})
      prisma.$disconnect();
      return 'User is create';
    }
    catch (e)
    {
      if(e instanceof PrismaClientKnownRequestError)
      {
        if(e.code === 'P2002')
        {
          prisma.$disconnect();
          throw new ForbiddenException('Error : Email is already used');
        }
      }
      prisma.$disconnect();
      throw e;
    }
  }

  async findAll() {
    prisma.$connect();
    const allUsers = await prisma.users.findMany();
    prisma.$disconnect();
    return `This action returns all users` + allUsers;
  }

  async findOneById(id: number) {
    prisma.$connect();
    const User = await prisma.users.findUnique({where: {
        id: id,
      },});
    prisma.$disconnect();
    return `This action returns a #${id} user`;
  }

  async findOneByEmail(email: string) {
    prisma.$connect();
    const User = await prisma.users.findUnique({where: {
        email: email,
      },});
    prisma.$disconnect();
    return `This action returns a #${email} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    prisma.$connect();
    try
    {
      const User = await prisma.users.update({
        data: updateUserDto,
        where: {
          id: id,
        },
      });
      prisma.$disconnect();
      return 'This action updates a #${id} user';
    }
    catch (e)
    {
      prisma.$disconnect();
      if(e instanceof PrismaClientKnownRequestError)
      {
        if(e.code === 'P2002')
        {
          throw new ForbiddenException('Email is already used');
        }
      }
      throw e;
    }
  }

  async remove(id: number) {
    prisma.$connect();
    try
    {
      const allUsers = await prisma.users.delete({
        where: {id: id}
      });
      prisma.$disconnect();
      return 'This action removes a #${id} user';
    }
    catch (e)
    {
      if(e instanceof PrismaClientKnownRequestError)
      {
        if(e.code === 'P2003')
        {
          prisma.$disconnect();
          throw new ForbiddenException('Error: Foreign key contraints failed delete');
        }
      }
      prisma.$disconnect();
      throw e;
    }
  }
}
