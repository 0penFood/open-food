import {ForbiddenException, Injectable} from '@nestjs/common';
import {JwtStrategy} from "./strategy/jwt.strategy";
import { UsersService } from "../users/users.service";
import { SocietiesService } from 'src/societies/societies.service';
import { CommandesService } from "../commandes/commandes.service";

@Injectable()
export class RolesService {
    constructor() {}

    private jwtStrategy = new JwtStrategy();

    async getTokenData(token: string) {
        const userData = JSON.stringify(await this.jwtStrategy.decodeToken(token));
        return JSON.parse(userData)
    }

    async currentRole(token: string) {
        let userData = await this.getTokenData(token);
        const userService = new UsersService();
        const userDB = await userService.findUserAdm(userData.email);

        if (userDB.roles === userData.roles) {
            return userData.roles;
        } else {
            throw new ForbiddenException('Forbidden');
        }
    }

    async currentRoleYourself(token: string) {
        let userData = await this.getTokenData(token);
        const userService = new UsersService();
        const userDB = await userService.findUserAdm(userData.email);

        if (userDB.roles === userData.roles && userDB.id === userData.id) {
            return userData.roles;
        } else {
            throw new ForbiddenException('Forbidden');
        }
    }

    async currentRoleSociety(token: string, idSociety: number) {

        let userData = await this.getTokenData(token);
        const userService = new UsersService();

        const userJSONId = await userService.findAllLinkSocietiesSociety(idSociety);

        let checkUser = false;
        Object.keys(userJSONId).forEach(id => {
            if(userJSONId[id]["user_id"] == userData.id)
            {
                checkUser = true;
            }
        });
        const userDB = await userService.findUserAdm(userData.email);

        if (userDB.roles === userData.roles && checkUser) {
            return userData.roles;
        } else {
            throw new ForbiddenException('Forbidden');
        }
    }

    async currentIDSociety(req : any)
    {
        let userData = await this.getTokenData(req.headers["authorization"].split(" ")[1]);
        const societyService    = new SocietiesService();
        const commandesService  = new CommandesService();
        const usersService      = new UsersService();

        try {
            if(req.body["idRestau"] != undefined)
            {
                if(200 < userData.roles && userData.roles < 300){
                    const userInfoSocieies = await usersService.findAllLinkSocietiesUser(req.body["idLivreur"]);
                    return userInfoSocieies[Object.keys(userInfoSocieies)[0]]["societyId"];
                }
                else {
                    const idSociety = await societyService.findOneRestauPartial(req.body["idRestau"]);
                    return idSociety[Object.keys(idSociety)[0]]["societyId"];
                }

            }
            else if(req.body["commandesID"] != undefined)
            {
                if(200 < userData.roles && userData.roles < 300)
                {
                    const commande = await commandesService.findOne(req.body["commandesID"]);
                    const userInfoSocieies = await usersService.findAllLinkSocietiesUser(commande[Object.keys(commande)[0]]["idLivreur"]);
                    return userInfoSocieies[Object.keys(userInfoSocieies)[0]]["societyId"];
                }
                else{
                    const commande = await commandesService.findOne(req.body["commandesID"]);
                    const idSociety = await societyService.findOneRestauPartial(commande[Object.keys(commande)[0]]["idRestau"]);
                    return idSociety[Object.keys(idSociety)[0]]["societyId"];
                }
            }
        }
        catch (e){
            console.log(e);
        }
    }
}
