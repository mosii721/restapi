import { ApiProperty } from '@nestjs/swagger';
import {IsNumber,IsDateString} from 'class-validator';

export class CreateRegistrationDto {
      @ApiProperty({
      description: 'ID of the user being  registered', example: 1})
      @IsNumber()
      user_id:number;

      @ApiProperty({
      description: 'ID of the room being registered', example: 5})
      @IsNumber()
      room_id:number;

      @ApiProperty({
      description: 'ID of the course of beingthe user registered', example: 3})
      @IsNumber()
      course_id:number;

      @ApiProperty({
      description: 'Date of registration in ISO format', example: "2025-04-04"})
      @IsDateString()
      registration_date:string;
        
}
