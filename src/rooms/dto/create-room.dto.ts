import { ApiProperty } from '@nestjs/swagger';
import {IsNumber,IsString,IsOptional} from 'class-validator';

export class CreateRoomDto {
    @ApiProperty({
        description: 'Unique identifier for the room', example: 6})
    @IsNumber()
    room_number:number;

    @ApiProperty({
        description: 'Number of seats available in the room', example: 4, required: false})
    @IsOptional()
    @IsNumber()
    seaters:number;

    @ApiProperty({
        description: 'Fee for the room', example: 5000})
    @IsNumber()
    fee:number;

    @ApiProperty({
        description: 'Type of the room', example: 'Single'})
    @IsString()
    room_type:string;
}
