import {IsNumber,IsString,IsOptional} from 'class-validator';

export class CreateRoomDto {
    @IsNumber()
    room_number:number;

    @IsOptional()
    @IsNumber()
    seaters:number;

    @IsNumber()
    fee:number;

    @IsString()
    room_type:string;
}
