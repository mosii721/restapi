import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Complaint } from './entities/complaint.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ComplaintsService {

  constructor(@InjectRepository(Complaint) private complaintRepository:Repository<Complaint>,
@InjectRepository(User) private userRepository:Repository<User>){}

  async create(createComplaintDto: CreateComplaintDto) {
    const existUser  = await this.userRepository.findOneBy({id: createComplaintDto.user_id});
           
    if(!existUser){
      throw new NotFoundException(`Complaint  with  id  ${createComplaintDto.user_id}  not found`);
    }
    const newComplaint = this.complaintRepository.create({
      complaint_text:createComplaintDto.complaint_text,
      status:createComplaintDto.status,
      users:existUser,
    })
    return  await this.complaintRepository.save(newComplaint)
  }

  async findAll() {
    return await this.complaintRepository.find({relations:['users']});
  }

  async findOne(id: number) {
    return await  this.complaintRepository.find({
      where:{id},
        relations:['users']
    });
  }

  async update(id: number, updateComplaintDto: UpdateComplaintDto) {
    return await this.complaintRepository.update(id,updateComplaintDto);
  }

  async remove(id: number) {
    return await  this.complaintRepository.delete(id);
  }
}
