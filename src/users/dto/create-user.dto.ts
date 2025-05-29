import {IsString,IsNumber,IsDateString} from 'class-validator';

export class CreateUserDto {
    @IsString()
        username:string;
        @IsString()
        password:string;
        @IsDateString()
        lastlogin:string;
        @IsNumber()
        userprofileid:number;
}
