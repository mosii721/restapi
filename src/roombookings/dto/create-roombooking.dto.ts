import {IsNumber} from 'class-validator';

export class CreateRoombookingDto {
    @IsNumber()
    user_id:number;

    @IsNumber()
    room_id:number;

}
