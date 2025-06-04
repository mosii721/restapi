import {IsString, IsEmail, IsEnum, IsNotEmpty} from 'class-validator';
import { Role } from '../entities/adminprofile.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminprofileDto {
        @ApiProperty({description: 'First name of the admin', example: 'John'})
        @IsString()
        @IsNotEmpty()
        first_name:string;

        @ApiProperty({description: 'Last name of the admin', example: 'Doe'})
        @IsString()
        @IsNotEmpty()
        last_name:string;

        @ApiProperty({description: 'Phone number of the admin', example: '+1234567890'})
        @IsString()
        phone_number:string;

        @ApiProperty({description: 'Email address of the admin', example: 'john@gmail.com'})
        @IsEmail()
        email:string;

        @ApiProperty({
                description: 'Role of the admin',
                example: 'admin',
                enum: Role,
                enumName: 'Role'
        })
        @IsEnum(Role,{
                message:'Role must be either: user, admin, guest'
        })
        role:Role=Role.GUEST;
}
