import { ApiProperty } from '@nestjs/swagger';
import {IsNumber} from 'class-validator';

export class CreateRoombookingDto {
    @ApiProperty({
        description: 'ID of the user making the room booking', example: 1})
    @IsNumber()
    user_id:number;

    @ApiProperty({
        description: 'ID of the room being booked', example: 5})
    @IsNumber()
    room_id:number;

}
