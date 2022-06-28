import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AccountScopeGuard } from "./account-scope.guard";
import { RolesGuard } from "./roles.guard";
import { SocietyScopeGuard } from "./society-scope.guard";

@Injectable()
export class ComposeUserAuthGuard implements CanActivate {
  private userGuard: AccountScopeGuard;
  private adminGuard: RolesGuard;
  private societyGuard: SocietyScopeGuard;

  constructor(private roleAdmin: string[], private roleUser: string[], private roleSociety: string[]) {
    this.userGuard = new AccountScopeGuard(roleUser);
    this.adminGuard = new RolesGuard(roleAdmin);
    this.societyGuard = new SocietyScopeGuard(roleSociety);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return await this.userGuard.canActivate(context) || await this.adminGuard.canActivate(context)|| await this.societyGuard.canActivate(context);
  }
}