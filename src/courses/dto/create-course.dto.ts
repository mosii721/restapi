import {IsNumber,IsString,IsDateString} from 'class-validator';

export class CreateCourseDto {
    @IsString()
            course_name:string;
        
            @IsString()
            course_duration:string;

            @IsNumber()
            course_fee:number;
        

}
