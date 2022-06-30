import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {RolesService} from "../roles.service";

@Injectable()
export class AccountScopeGuard implements CanActivate {
    constructor(
        private role: string[]
    ) {}
    canActivate(
        context: ExecutionContext,
    ): any | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const rolesService = new RolesService()

        try{
            return rolesService.currentRoleYourself(request.headers["authorization"].split(" ")[1]).then((res: any) => {
                if(this.role.find(res2 => res === res2)) {
                    return true;
                }
                else{
                    return false;
                }
            })
        }
        catch(e)
        {
            return false;
        }

    }
}
