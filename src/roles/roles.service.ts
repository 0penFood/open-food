import {ForbiddenException, Injectable} from '@nestjs/common';
import {JwtStrategy} from "./strategy/jwt.strategy";
import { UsersService } from "../users/users.service";

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
}
