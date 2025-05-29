import {IsNumber,IsString,IsEnum} from 'class-validator';
import { Status } from '../entities/complaint.entity';

export class CreateComplaintDto {
        @IsNumber()
        user_id:number;

        @IsString()
        complaint_text:string;

        @IsEnum(Status,{
                message:'Status must be either: pending, resolved'
        })
        status:Status=Status.PENDING;
    
}
