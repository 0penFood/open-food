import {Controller, Post, Request, UseGuards} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {RolesGuard} from "./guards/roles.guard";

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @UseGuards(new RolesGuard([process.env.SUPERADMIN_RIGHTS]))
    @Post('test')
    currentRole(@Request() req: any) {
        return this.rolesService.currentRole(req.headers.authorization.split(" ")[1]);
    }
}
