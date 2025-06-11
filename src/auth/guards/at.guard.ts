import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard} from "@nestjs/passport";
import { Observable } from "rxjs";


@Injectable()
export class AtGuard extends AuthGuard( 'jwt-at') {// same name as the strategy

    constructor(private readonly reflector: Reflector) { 
        super();    
        };
    

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);

        if(isPublic){
            return  true;// if the route is public, skip authentication
        }

        return super.canActivate(context);//proceed with the authentication process
    }
}