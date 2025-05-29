import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Registration } from './entities/registration.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';


@Injectable()
export class RegistrationsService {

  constructor(@InjectRepository(Registration) private registrationRepository:Repository<Registration>,
  @InjectRepository(User) private userRepository:Repository<User>,
  @InjectRepository(Course) private courseRepository:Repository<Course>,){}

  async create(createRegistrationDto: CreateRegistrationDto) {
    const existUser  = await this.userRepository.findOneBy({id: createRegistrationDto.user_id});
    const existCourse  = await this.courseRepository.findOneBy({id: createRegistrationDto.course_id});
        
            if(!existUser || !existCourse){
              throw new NotFoundException(`Profile  with  id  ${createRegistrationDto.user_id}  &  ${createRegistrationDto.course_id}  not found`);
            }
            const newRegistartion =this.registrationRepository.create({
              room_id:createRegistrationDto.room_id,
              registration_date:createRegistrationDto.registration_date,
              user:existUser,
              courses:existCourse
            })
            return  await this.registrationRepository.save(newRegistartion)
          }

  async findOne(id: number) {
    return await  this.registrationRepository.find({
      where:{id},
        relations:['user','course']
    });
  }

  async update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
    return await this.registrationRepository.update(id,updateRegistrationDto);
  }

  async remove(id: number) {
    return await  this.registrationRepository.delete(id);
  }
}
