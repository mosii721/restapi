import {IsNumber,IsDateString} from 'class-validator';

export class CreateRegistrationDto {
      @IsNumber()
      user_id:number;

      @IsNumber()
      room_id:number;

      @IsNumber()
      course_id:number;

      @IsDateString()
      registration_date:string;
        
}
