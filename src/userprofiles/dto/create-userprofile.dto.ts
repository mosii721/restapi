import {IsString,IsNotEmpty,IsEmail,IsEnum} from 'class-validator';
import { Role } from '../entities/userprofile.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserprofileDto {
     @ApiProperty({description: 'First name of the user', example: 'John'})
     @IsString()
     @IsNotEmpty()
     first_name:string;

     @ApiProperty({description: 'Last name of the user', example: 'Doe'})
     @IsString()
     @IsNotEmpty()
     last_name:string;

     @ApiProperty({description: 'Phone number of the user', example: '+1234567890'})
     @IsString()
     phone_number:string;

     @ApiProperty({description: 'Email address of the user', example: 'john@gmail.com'})
     @IsEmail()
     email:string;

     @ApiProperty({
          description: 'Role of the user',
          example: 'user',
          enum: Role,
          enumName: 'Role'
     })
     @IsEnum(Role,{
               message:'Role must be either: user, admin, guest'
     })
     role:Role=Role.GUEST;
}
