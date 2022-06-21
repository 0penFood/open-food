import { Body, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { LocalStrategy } from "../strategy/local.strategy";
import { AuthService } from "../auth.service";
import { AuthDto } from "../dto/auth.dto";

@Injectable()
export class LocalAuthGuard{

  constructor(private authService: AuthService){}

  canActivate( context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean>
  {
    const localStrategy = new LocalStrategy(this.authService);
    const request: AuthDto = context.switchToHttp().getRequest().body;

    return localStrategy.validate(request.email, request.password);
  }
}