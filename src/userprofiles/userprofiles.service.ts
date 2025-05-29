import { Injectable } from '@nestjs/common';
import { CreateUserprofileDto } from './dto/create-userprofile.dto';
import { UpdateUserprofileDto } from './dto/update-userprofile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Userprofile } from './entities/userprofile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserprofilesService {

  constructor(@InjectRepository(Userprofile) private userprofileRepository:Repository<Userprofile>){}

  async create(createUserprofileDto: CreateUserprofileDto) {
    return  await this.userprofileRepository.save(createUserprofileDto);
  }

  async findAll(email?: string) {
    if (email) {
      return await this.userprofileRepository.find({
        where:{email},
        relations:['user']
      }) ;
    }
    return await this.userprofileRepository.find({relations:['user']});
  }


  async findOne(id: number) {
    return await this.userprofileRepository.findOneBy({id});
  }

  async update(id: number, updateUserprofileDto: UpdateUserprofileDto) {
    await  this.userprofileRepository.update(id,updateUserprofileDto);
    return this.findOne(id)
  }

  async remove(id: number) {
    return await  this.userprofileRepository.delete(id);
  }
}
