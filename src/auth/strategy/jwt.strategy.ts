import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }
    async decodeToken(val: string)
    {
        var jwtservice = new JwtService();
        return jwtservice.decode(val, {json: true});
    }

    async validate(payload: any) {

        return { email: payload.email };
    }
}