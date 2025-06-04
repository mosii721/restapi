import { ApiProperty } from '@nestjs/swagger';
import {IsNumber} from 'class-validator';

export class CreateUseraccessDto {
    @ApiProperty({
        description: 'ID of the user accessing the system', example: 1})
    @IsNumber()
    user_id:number;

    }

