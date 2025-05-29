import {IsString, IsEmail, IsEnum, IsNotEmpty} from 'class-validator';
import { Role } from '../entities/adminprofile.entity';

export class CreateAdminprofileDto {
        @IsString()
        @IsNotEmpty()
        first_name:string;
        @IsString()
        @IsNotEmpty()
        last_name:string;
        @IsString()
        phone_number:string;
        @IsEmail()
        email:string;
        @IsEnum(Role,{
                message:'Role must be either: user, admin, guest'
        })
        role:Role=Role.GUEST;
}
