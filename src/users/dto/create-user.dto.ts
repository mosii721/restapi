import { ApiProperty } from '@nestjs/swagger';
import {IsString,IsNumber,IsDateString} from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        description: 'Unique identifier for the user', example: 'john_doe'})
    @IsString()
    username:string;

    @ApiProperty({description: 'Last login date and time in ISO format', example: "2025-04-04"})
    @IsDateString()
    lastlogin:string;

    @ApiProperty({description: 'ID of the user profile', example: 1})
    @IsNumber()
    userprofileid:number;
}
