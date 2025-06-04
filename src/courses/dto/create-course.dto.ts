import { ApiProperty } from '@nestjs/swagger';
import {IsNumber,IsString} from 'class-validator';

export class CreateCourseDto {
    @ApiProperty({
        description: 'Unique identifier for the course', example: 'Software Engineering'})
    @IsString()
    course_name:string;

    @ApiProperty({
        description: 'Duration of the course', example: '4yrs'})
    @IsString()
    course_duration:string;

    @ApiProperty({
        description: 'fee of the course', example: '100000'})
    @IsNumber()
    course_fee:number;
        

}
