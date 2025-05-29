import {IsNumber,IsString,IsOptional,Min,Max} from 'class-validator';

export class CreateUserfeedbackDto {
    @IsNumber()
    user_id:number;

    @IsString()
    feedack_text:string;

    @IsNumber()
    @Min(0)
    @Max(5)
    @IsOptional()
    rating:number;

        
}
