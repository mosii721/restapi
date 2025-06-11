import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../entities/profile.entity';

export class CreateProfileDto {
        @ApiProperty({description: 'First name ', example: 'John' })
        @IsString()
        @IsNotEmpty()
        first_name:string;

        @ApiProperty({description: 'Last name ', example: 'Doe'})
        @IsString()
        @IsNotEmpty()
        last_name:string;

        @ApiProperty({description: 'Phone number ', example: '+1234567890'})
        @IsString()
        phone_number:string;

        @ApiProperty({description: 'Email address ', example: 'john@gmail.com'})
        @IsEmail()
        email:string;

        @ApiProperty({description:'Password',example:'password'})
        @IsString()
        @IsNotEmpty()
        password: string;

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
