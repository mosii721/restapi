import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateUserfeedbackDto } from './dto/create-userfeedback.dto';
import { UpdateUserfeedbackDto } from './dto/update-userfeedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Userfeedback } from './entities/userfeedback.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UserfeedbacksService {
  
  constructor(@InjectRepository(Userfeedback) private userfeedbackRepository:Repository<Userfeedback>,
  @InjectRepository(User) private userRepository:Repository<User>){}

  async create(createUserfeedbackDto: CreateUserfeedbackDto) {
   const existUser  = await this.userRepository.findOneBy({id: createUserfeedbackDto.user_id});
       
           if(!existUser){
             throw new NotFoundException(`Profile  with  id  ${createUserfeedbackDto.user_id}  not found`);
           }
           const newUserfeedback = this.userfeedbackRepository.create({
             feedack_text:createUserfeedbackDto.feedack_text,
             rating:createUserfeedbackDto.rating,
             users:existUser,
           })
           return  await this.userfeedbackRepository.save(newUserfeedback)
         }
      
  async findOne(id: number) {
    return await  this.userfeedbackRepository.find({
      where:{id},
        relations:['users']
    });
  }

  async update(id: number, updateUserfeedbackDto: UpdateUserfeedbackDto) {
    return await this.userfeedbackRepository.update(id,updateUserfeedbackDto);
  }

  async remove(id: number) {
    return await  this.userfeedbackRepository.delete(id);
  }
}
