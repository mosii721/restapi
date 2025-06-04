import { ApiProperty } from '@nestjs/swagger';
import {IsNumber,IsString,IsOptional,Min,Max} from 'class-validator';

export class CreateUserfeedbackDto {
    @ApiProperty({
        description: 'ID of the user providing feedback', example: 1})
    @IsNumber()
    user_id:number;

    @ApiProperty({
        description: 'Text of the feedback', example: 'The hostel facilities are great!'})
    @IsString()
    feedack_text:string;

    @ApiProperty({
        description: 'Rating given by the user', example: 4, required: false})
    @IsNumber()
    @Min(0)
    @Max(5)
    @IsOptional()
    rating:number;

        
}
