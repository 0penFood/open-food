import {Controller, Post, Request, UseGuards} from '@nestjs/common';
import {RolesService} from "./roles.service";
import { SocietyScopeGuard } from "./guards/society-scope.guard";

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @UseGuards(new SocietyScopeGuard([process.env.USER_RIGHTS]))
    @Post('test')
    currentRole(@Request() req: any) {
        return "ok";
        //return this.rolesService.currentRoleSociety(req.headers["authorization"].split(" ")[1]);
    }
}
