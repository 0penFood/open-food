import { ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtStrategy } from "../strategy/jwt.strategy";

@Injectable()
export class JwtAuthGuard
{
  constructor(){}

  canActivate( context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean>
  {
    const request = context.switchToHttp().getRequest();
    const jwtStrategy = new JwtStrategy();

    jwtStrategy.decodeToken(request.headers["authorization"].split(" ")[1]).then((res: any) => console.log(res.email));
    return true;
  }
}
