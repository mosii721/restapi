import {  IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateAdminDto {
    @IsString()
    username:string;
    @IsString()
    password:string;
    @IsDateString()
    lastlogin:string;

    @IsNumber()
    adminprofileid:number;
}
