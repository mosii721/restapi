import {IsNumber,IsString,IsEnum} from 'class-validator';
import { Status } from '../entities/complaint.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateComplaintDto {
        @ApiProperty({
                description: 'ID of the user making the complaint',example: 1})
        @IsNumber()
        user_id:number;

        @ApiProperty({
                description: 'Text of the complaint',example: 'The room is not clean'})
        @IsString()
        complaint_text:string;

        @ApiProperty({
                description: 'Status of the complaint',
                example: 'pending',
                enum: Status,
                enumName: 'Status'
        })
        @IsEnum(Status,{
                message:'Status must be either: pending, resolved'
        })
        status:Status=Status.PENDING;
    
}
