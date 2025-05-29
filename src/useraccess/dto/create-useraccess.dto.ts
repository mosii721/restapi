import {IsNumber} from 'class-validator';

export class CreateUseraccessDto {
    @IsNumber()
    user_id:number;

    }

