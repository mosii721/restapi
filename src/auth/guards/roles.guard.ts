import { CanActivate ,ExecutionContext,Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile, Role } from "src/profiles/entities/profile.entity";
import { Repository } from "typeorm";
import { ROLES_KEY } from "../decorators/role.decorator";
import { Request } from "express";
import { JWTPayload } from "../strategies/at.strategy";


interface UserRequest extends Request{
    user?: JWTPayload
}


@Injectable()
export class RolesGuard implements CanActivate{
    constructor(
        private reflector:Reflector,//Reflector-> Reads metadata (e.g. roles) set by decorators
        @InjectRepository(Profile) private profileRepository:Repository<Profile>,
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[//Looks for roles declared via the @Roles() decorator on the route
            context.getHandler(),
            context.getClass(),
        ])
        if(!requiredRoles){
            return true; // If no roles are required, allow access
        }
        const request = context.switchToHttp().getRequest<UserRequest>();
        const user = request.user;

        if(!user){
            return false;
        }

        const UserProfile = await this.profileRepository.findOne({
            where:{id:user.sub},
            select:['id','role'],
        })

        if(!UserProfile){
            return false;
        }

        return requiredRoles.some((role) => UserProfile.role == role) //Compares the user’s actual role to the list of required roles
    }
}