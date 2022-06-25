import { PrismaClient } from '@internal/prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { CreateArticleCommandeDto } from "./dto/create-article-commande.dto";
import { UpdateArticleCommandeDto } from "./dto/update-article-commande.dto";
import { Logger } from "../../helpers/logger";

const prisma2 = new PrismaClient()

@Injectable()
export class CommandesService {

  // ######################### CREATE ROUTE PART #########################

  async createCommande(createCommandeDto: CreateCommandeDto) {
    await prisma2.$connect();
    try
    {
      await prisma2.commandes.create({data: createCommandeDto});
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'User with id ' + createCommandeDto.idUser + ' create Commande with Restaurant ' + createCommandeDto.idRestau);
      return {
        message: 'User with id ' + createCommandeDto.idUser + ' create Commande with Restaurant ' + createCommandeDto.idRestau,
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : ' + e.message);
      throw e;
    }
  }

  async createArticle(idCommande : string, createArticleCommandeDto: CreateArticleCommandeDto) {
    await prisma2.$connect();
    try
    {
      await prisma2.articlesCommandes.create({data: createArticleCommandeDto});
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Article with name : "' + createArticleCommandeDto.name + '" is add to commande with id ' + createArticleCommandeDto.commandesID);
      return {
        message: 'Article with name : "' + createArticleCommandeDto.name + '" is add to commande with id ' + createArticleCommandeDto.commandesID,
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : ' + e.message);
      throw e;
    }
  }


  // ######################### FIND ROUTE PART #########################

  async findAll() {
    await prisma2.$connect();
    try
    {
      const allCommandes = await prisma2.commandes.findMany({
        include:{
          articles: true
        }
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Recover all commandes ' );

      return this.concatData(allCommandes);
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }


  async findAllUser(id: number) {
    await prisma2.$connect();
    try
    {
      const allCommandes = await prisma2.commandes.findMany({
        where: {
          idUser: id,
        },
        include:{
          articles: true
        }
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Recover all commandes for id user ' + id );

      return this.concatData(allCommandes);
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async findAllUserActive(id: number) {
    await prisma2.$connect();
    try
    {
      const allCommandes = await prisma2.commandes.findMany({
        where: {
          AND:
          [
            {
              idUser: id,
            },
            {
              OR:[{
                state: Number(process.env.STATE_CMD_INIT),
              },
                {
                  state: Number(process.env.STATE_CMD_ACCEPT),
                },
                {
                  state: Number(process.env.STATE_CMD_PREPARE),
                },
                {
                  state: Number(process.env.STATE_CMD_ACCEPT_DELIVERY),
                },
                {
                  state: Number(process.env.STATE_CMD_GO_DELIVERY),
                },
              ],
            }
          ]
        },
        include:{
          articles: true
        }
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Recover all actives commandes for id user ' + id );

      return this.concatData(allCommandes);
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }


  async findAllRestau(id: string) {
    await prisma2.$connect();
    try
    {
      const allCommandes = await prisma2.commandes.findMany({
        where: {
          idRestau: id,
        },
        include:{
          articles: true
        }
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Recover all commandes for id restaurant ' + id );

      return this.concatData(allCommandes);
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async findAllRestauActive(id: string) {
    await prisma2.$connect();
    try
    {
      const allCommandes = await prisma2.commandes.findMany({
        where: {
          AND:
          [
            {
              idRestau: id,
            },
            {
              OR:[{
                state: Number(process.env.STATE_CMD_INIT),
              },
                {
                  state: Number(process.env.STATE_CMD_ACCEPT),
                },
                {
                  state: Number(process.env.STATE_CMD_PREPARE),
                },
                {
                  state: Number(process.env.STATE_CMD_ACCEPT_DELIVERY),
                },
                {
                  state: Number(process.env.STATE_CMD_GO_DELIVERY),
                },
              ],
            }
          ]
        },
        include:{
          articles: true
        }
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Recover all actives commandes for id Restaurant ' + id );

      return this.concatData(allCommandes);
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }


  async findAllDelivery(id: number) {
    await prisma2.$connect();
    try
    {
      const allCommandes = await prisma2.commandes.findMany({
        where: {
          idLivreur: id,
        },
        include:{
          articles: true
        }
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Recover all commandes for id delivery man ' + id );

      return this.concatData(allCommandes);
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async findAllDeliveryActive(id: number) {
    await prisma2.$connect();
    try
    {
      const allCommandes = await prisma2.commandes.findMany({
        where: {
          AND:
          [
            {
              idLivreur: id,
            },
            {
              OR:[{
                state: Number(process.env.STATE_CMD_INIT),
              },
                {
                  state: Number(process.env.STATE_CMD_ACCEPT),
                },
                {
                  state: Number(process.env.STATE_CMD_PREPARE),
                },
                {
                  state: Number(process.env.STATE_CMD_ACCEPT_DELIVERY),
                },
                {
                  state: Number(process.env.STATE_CMD_GO_DELIVERY),
                },
              ],
            }
          ]
        },
        include:{
          articles: true
        }
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Recover all actives commandes for id delivery man ' + id );

      return this.concatData(allCommandes);
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }



  async concatData(commandesArray: any)
  {
    let commandes = {};
    commandesArray.forEach(commande => {
      commandes[commande.id] = {
        idUser:           commande.idUser,
        idRestau:         commande.idRestau,
        idLivreur:        commande.idLivreur,
        timeDelivery:     commande.timeDelivery,
        state:            commande.state,
        price:            commande.price,
        deliveryAddress:  commande.deliveryAddress,
      }
      commande.articles.forEach(article => {
        commandes[commande.id].append("name", article.name);
        commandes[commande.id].append("quantity", article.quantity);
      });
    });
    return commandes;
  }

  async findOne(id: string) {
    await prisma2.$connect();
    try
    {
      const commande = await prisma2.commandes.findUnique({
        where: {
          id: id,
        },
        include:{
          articles: true
        }
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Recover commande with id ' + id );

      return commande;
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }


  // ######################### UPDATE ROUTE PART #########################

  async updateCommand(id: string, updateCommandeDto: UpdateCommandeDto) {
    await prisma2.$connect();
    try
    {
      await prisma2.commandes.update({
        where:{
          id: id
        },
        data: updateCommandeDto
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Commande with id ' + id + ' modificated ');
      return {
        message: 'Commande with id ' + id + ' modificated ',
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : ' + e.message);
      throw e;
    }
  }

  async updateArticle(idCommande: string, updateCommandeDto: UpdateArticleCommandeDto, idArticle: string) {
    await prisma2.$connect();
    try
    {
      await prisma2.articlesCommandes.update({
        where:{
          id: idArticle,
        },
        data: updateCommandeDto
      });

      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Article with id ' + updateCommandeDto.idUser + ' in Commande with id ' + updateCommandeDto.idUser + ' modificated');
      return {
        message: 'Article with id ' + updateCommandeDto.idUser + ' in Commande with id ' + updateCommandeDto.idUser + ' modificated',
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : ' + e.message);
      throw e;
    }
  }


  // ######################### REMOVE ROUTE PART #########################

  async removeCommand(id: string) {
    await prisma2.$connect();
    try
    {
      this.removeArticles(id);

      await prisma2.commandes.update({
        where:{
          id: id,
        },
        data :{
          articles: undefined,
        }
      });

      await prisma2.commandes.delete({
        where: {
          id: id
        }
      });

      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Commande with id ' + id + ' deleted');

      return {
        message: 'Commande with id ' + id + ' deleted',
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async removeArticle(id: string) {
    await prisma2.$connect();
    try
    {
      await prisma2.articlesCommandes.delete({
        where: {
          id: id
        }
      });
      await prisma2.$disconnect();
      await Logger.infoLog('api', 'Article with id ' + id + ' deleted');

      return {
        message: 'Article with id ' + id + ' deleted',
      };
    }
    catch (e)
    {
      await prisma2.$disconnect();
      await Logger.errorLog('api', 'Error : '+e.message);
      throw e;
    }
  }

  async removeArticles(id: string) {
    await prisma2.$connect();
    try
    {
      const allArticles = await prisma2.articlesCommandes.findMany({
        where: {
          commandesID: id
        }
      });

      await allArticles.forEach(async(article) => {
        await prisma2.articlesCommandes.delete({
          where: {
            id: article.id,
          }
        });
      });

      await prisma2.$disconnect();
      await Logger.infoLog('api', 'All Article link to Commande with id ' + id + ' deleted');

      return {
        message: 'All Article link to Commande with id ' + id + ' deleted',
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
