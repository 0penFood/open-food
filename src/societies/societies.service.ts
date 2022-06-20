import { ForbiddenException, Injectable }   from "@nestjs/common";
import { CreateSocietyDto }                 from './dto/create-society.dto';
import { UpdateSocietyDto }                 from './dto/update-society.dto';
import { PrismaClient }                     from "@prisma/client";
import { PrismaClientKnownRequestError }    from "@prisma/client/runtime";

const prisma = new PrismaClient();

@Injectable()
export class SocietiesService {
  async create(createSocietyDto: CreateSocietyDto) {
    prisma.$connect();
    try
    {
      await prisma.societies.create({data: createSocietyDto});
      prisma.$disconnect();
      return 'This action adds a new society';
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
    const allSocieties = await prisma.societies.findMany();
    prisma.$disconnect();
    return `This action returns all users` + allSocieties;
  }

  async findOne(id: number) {
    prisma.$connect();
    const User = await prisma.societies.findUnique({where: {
        id: id,
      },});
    prisma.$disconnect();
    return `This action returns a #${id} society`;
  }

  async update(id: number, updateSocietyDto: UpdateSocietyDto) {
    prisma.$connect();
    try
    {
      await prisma.societies.update({
        data: updateSocietyDto,
        where: {
          id: id,
        },
      });
      prisma.$disconnect();
      return `This action updates a #${id} society`;
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
      await prisma.societies.delete({
        where: {id: id}
      });
      prisma.$disconnect();
      return 'This action removes a #${id} society';
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
