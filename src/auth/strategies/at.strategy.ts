import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy,  ExtractJwt } from "passport-jwt";


export type JWTPayload = {
    sub: number; //subject, usually the user ID
    email:string;
    role:string;
}

//validates short-lived access tokens
@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-at') {// jwt-at is the name of the strategy

    constructor(private readonly configService: ConfigService) { 
        super({     //from passport class PassportStrategy
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //extracts JWT from the Authorization header /only extracts the token
            secretOrKey: configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'), //secret key for verifying the JWT
        });
    }

    validate(payload:JWTPayload):JWTPayload{
        return  payload;
    }
}