import { ApiProperty } from '@nestjs/swagger';
import {  IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateAdminDto {
    @ApiProperty({
        description: 'Unique identifier for the admin',example: 'admin123'})
    @IsString()
    username:string;
    @ApiProperty({
        description: 'Password for the admin account', example: 'securepassword'})
    @IsString()
    password:string;
    @ApiProperty({description: 'Last login date and time in ISO format', example: "2025-04-04"})
    @IsDateString()
    lastlogin:string;

    @ApiProperty({description: 'ID of the admin profile', example: 1})
    @IsNumber()
    adminprofileid:number;
}
