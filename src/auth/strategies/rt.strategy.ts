import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy,  ExtractJwt,StrategyOptionsWithRequest } from "passport-jwt";



type JWTPayload = {
    sub: number; 
    email:string;
}

interface JwtPayloadWithRt extends JWTPayload {
    refreshToken: string; 
}

//validates long-lived refresh tokens
@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-rt') {

    constructor(private readonly configService: ConfigService) { 
            const options:StrategyOptionsWithRequest = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
            secretOrKey: configService.getOrThrow<string>('JWT_REFRESH_TOKEN_SECRET'), 
            passReqToCallback: true, //passes the request to the next function
        }

        super(options);
    }

    validate(req:Request, payload:JWTPayload):  JwtPayloadWithRt {
        const authHeader = req.get('Authorization');

        if (!authHeader) {
            throw new UnauthorizedException('no refresh token provided');
        }

        const refreshToken = authHeader.replace('Bearer ', '').trim();// removes 'Bearer ' from the refresh token
        if (!refreshToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }
        return{
            ...payload,
            refreshToken,
        }
    }
}