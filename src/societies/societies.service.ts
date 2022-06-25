import { ForbiddenException, Injectable }   from "@nestjs/common";
import { CreateSocietyDto }                 from './dto/create-society.dto';
import { UpdateSocietyDto }                 from './dto/update-society.dto';
import { PrismaClient }                     from "@prisma/client";
import { PrismaClientKnownRequestError }    from "@prisma/client/runtime";
import { Logger } from "../../helpers/logger";

const prisma = new PrismaClient();

@Injectable()
export class SocietiesService {


  // ######################### CREATE ROUTE PART #########################

  async create(createSocietyDto: CreateSocietyDto) {
    await prisma.$connect();
    try
    {
      await prisma.societies.create({data: createSocietyDto});
      await prisma.$disconnect();
      await Logger.infoLog('api', 'Society with name ' + createSocietyDto.societyName + ' created');
      return {
        message: 'Society with name ' + createSocietyDto.societyName + ' created',
      };
    }
    catch (e)
    {
      prisma.$disconnect();
      await Logger.errorLog('api', 'Error : ' + e.message);
      throw e;
    }
  }


  // ######################### FIND ROUTE PART #########################

  async findAllFull() {
    await prisma.$connect();
    try
    {
      const allSocieties = await prisma.societies.findMany({
        where: {
          isValid: true,
        }
      });
      await prisma.$disconnect();
      await Logger.infoLog('api', 'Recover all society with full information' );

      return await this.concatData(allSocieties, true);
    }
    catch (e)
    {
      await prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async findAllPartial() {
    await prisma.$connect();
    try
    {
      const allSocieties = await prisma.societies.findMany({
        where: {
          isValid: true,
        }
      });
      await prisma.$disconnect();
      await Logger.infoLog('api', 'Recover all society with partial information');

      return await this.concatData(allSocieties, false);
    }
    catch (e)
    {
      await prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async findOneFull(id: number) {
    await prisma.$connect();
    try
    {
      const society = await prisma.societies.findUnique({where: {
          id: id,
        },});
      await prisma.$disconnect();
      await Logger.infoLog('api', 'Recover full data society with id ' + id );

      return await this.concatData(society, true);
    }
    catch (e)
    {
      await prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async findOnePartial(id: number) {
    await prisma.$connect();
    try
    {
      const society = await prisma.societies.findUnique({
        where: {
            id: id,
          },
      });
      await prisma.$disconnect();
      await Logger.infoLog('api', 'Recover partial data society with id ' + id );

      return await this.concatData(society, false);
    }
    catch (e)
    {
      await prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async findOneRestauFull(id: string) {
    await prisma.$connect();
    try
    {
      const society = await prisma.societies.findMany({where: {
          idRestaurant: id,
        },});
      await prisma.$disconnect();
      await Logger.infoLog('api', 'Recover full data society with id restaurant ' + id );

      return await this.concatData(society, true);
    }
    catch (e)
    {
      await prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async findOneRestauPartial(id: string) {
    await prisma.$connect();
    try
    {
      const society = await prisma.societies.findMany({
        where: {
          idRestaurant: id,
          },
      });
      await prisma.$disconnect();
      await Logger.infoLog('api', 'Recover partial data society with id restaurant ' + id );

      return await this.concatData(society, false);
    }
    catch (e)
    {
      await prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async concatData(societiesArray: any, full: boolean)
  {
    let societies = {};
    if(full)
    {
      societiesArray.forEach(society => {
        societies[society.id] = {
          societyId:    society.id,
          societyAuth:  society.societyAuth,
          societyName:  society.societyName,
          sepa:         society.sepa,
          area:         society.area,
          idRestaurant: society.idRestaurant,
        }
      });
    }
    else {
      societiesArray.forEach(society => {
        societies[society.id] = {
          societyId:    society.id,
          societyAuth:  society.societyAuth,
          societyName:  society.societyName,
          idRestaurant: society.idRestaurant,
          area:         society.area,
        }
      });
    }
    return societies;
  }


  // ######################### UPDATE ROUTE PART #########################

  async update(id: number, updateSocietyDto: UpdateSocietyDto) {
    await prisma.$connect();
    try
    {
      await prisma.societies.update({
        data: updateSocietyDto,
        where: {
          id: id,
        },
      });
      await prisma.$disconnect();
      await Logger.infoLog('api', 'Society with id ' + id + ' modificated ');
      return {
        message: 'Society with id ' + id + ' modificated ',
      };
    }
    catch (e)
    {
      await prisma.$disconnect();
      await Logger.errorLog('api', 'Error : ' + e.message);
      throw e;
    }
  }


  // ######################### REMOVE ROUTE PART #########################

  async remove(id: number) {
    await prisma.$connect();
    try
    {
      await prisma.societies.update({
        where: {
          id: id
        },
        data:{
          isValid: false
        },
      });
      await prisma.$disconnect();
      await Logger.infoLog('api', 'Society with id ' + id + ' disabled');
      return {
        message: 'Society with id ' + id + ' disabled',
      };
    }
    catch (e)
    {
      if(e instanceof PrismaClientKnownRequestError)
      {
        if(e.code === 'P2003')
        {
          await prisma.$disconnect();
          await Logger.errorLog('api', 'Error : '+e.message);
          throw new ForbiddenException('Error: Foreign key contraints failed delete');
        }
      }
      await prisma.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }
}
