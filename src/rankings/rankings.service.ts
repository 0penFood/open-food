import { Injectable } from "@nestjs/common";
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { PrismaClient } from '@internal/prisma/client';
import { Logger } from "../../helpers/logger";

const prisma2 = new PrismaClient()

@Injectable()
export class RankingsService {


  // ######################### CREATE FUNCTION PART #########################

  async create(createRankingDto: CreateRankingDto) {
    await prisma2.$connect();
    try
    {
      await prisma2.rankings.create({data: createRankingDto});
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'User with id ' + createRankingDto.userId + ' add rankings to Restaurant with id ' + createRankingDto.idSociety);
      return {
        message: 'User with id ' + createRankingDto.userId + ' add rankings to Restaurant with id ' + createRankingDto.idSociety
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : ' + e.message);
      throw e;
    }
  }


  // ######################### FIND FUNCTION PART #########################

  async findOne(id: string) {
    await prisma2.$connect();
    try
    {
      const ranking = await prisma2.rankings.findUnique({
        where: {
          id: id
        }
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Recover ranking with id ' + id );

      return await this.concatData(ranking);
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async findAllBySociety(id: string) {
    await prisma2.$connect();
    try
    {
      const allRankings = await prisma2.rankings.findMany({
        where: {
          idSociety: id
        }
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Recover all rankings with id society ' + id );

      return await this.concatData(allRankings);
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async findAllByUser(id: number) {
    await prisma2.$connect();
    try
    {
      const allRankings = await prisma2.rankings.findMany({
        where: {
          userId: id
        }
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Recover all rankings with id user ' + id );

      return await this.concatData(allRankings);
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async concatData(rankingsArray: any)
  {
    let rankings = {};

    rankingsArray.forEach(ranking => {
      rankings[ranking.id] = {
        UserId: ranking.userId,
        SocietyId: ranking.idSociety,
        Stars: ranking.stars,
        Commentary: ranking.commentary,
      }
    });

    return rankings;
  }


  // ######################### UDPATE FUNCTION PART #########################

  async update(id: string, updateRankingDto: UpdateRankingDto) {
    await prisma2.$connect();
    try
    {
      if(id != null)
      {
        await prisma2.rankings.update({
          where: {
            id : id,
          },
          data: updateRankingDto});

        await prisma2.$disconnect();
        await Logger.infoLog('api', 'Ranking with id '+id+' updated');
        return {
          message : 'Ranking with id '+id+' updated'
        };
      }
      else
      {
        await Logger.infoLog('api', 'Ranking with id ' + id + ' not Found');
        return {
          message : 'No ID found'
        };
      }
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }


  // ######################### REMOVE FUNCTION PART #########################

  async remove(id: string) {
    await prisma2.$connect();
    try
    {
      await prisma2.rankings.delete({
        where: {
          id: id
        }
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Ranking with id ' + id + ' deleted');

      return {
        message: 'Ranking with id ' + id + ' deleted',
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
