import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {

  constructor(@InjectRepository(Course) private courseRepository:Repository<Course>){}

  async create(createCourseDto: CreateCourseDto) {
    return  await this.courseRepository.save(createCourseDto)
  }

  async findAll(search?: string) {
    if (search) {
      return await this.courseRepository.find({
        where:{course_name:search},
        relations:['registration']
      }) ;
    }
    return await this.courseRepository.find({relations:['registration']});
  }


  async findOne(id: number) {
    return await this.courseRepository.findOneBy({id})
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    await  this.courseRepository.update(id,updateCourseDto);
     return this.findOne(id)
  }

  async remove(id: number) {
    return await  this.courseRepository.delete(id);
  }
}
