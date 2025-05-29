import { Injectable } from '@nestjs/common';
import { CreateAdminprofileDto } from './dto/create-adminprofile.dto';
import { UpdateAdminprofileDto } from './dto/update-adminprofile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Adminprofile } from './entities/adminprofile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminprofilesService {

  constructor(@InjectRepository(Adminprofile) private adminprofileRepository:Repository<Adminprofile>){}

  async create(createAdminprofileDto: CreateAdminprofileDto) {
    return  await this.adminprofileRepository.save(createAdminprofileDto).then((adminprofile)=>{
      return  `This adds  a new profile with  ID:${adminprofile.id}`;
    }).catch((error)=>{
      console.error('Error creating profile:',error);
      throw new Error('Profile  creation failed');
    });
  }

  async findAll(email?: string) {
    if (email) {
      return await this.adminprofileRepository.find({
        where:{email},
        relations:['admin']
      }) ;
    }
    return await this.adminprofileRepository.find({relations:['admin']});
  }

  async findOne(id: number) {
    return await this.adminprofileRepository.findOneBy({id}).then((adminprofile)=>{
      if(!adminprofile){
        return  `Profile  with  id  ${id} not found`
      }
      return  adminprofile;
    }).catch((error)=>{
      console.error('Error finding profile:',error);
      throw new Error(`Profile  with  id  ${id} not found`);
    });;
  }

  async update(id: number, updateAdminprofileDto: UpdateAdminprofileDto):Promise<Adminprofile | string> {
     await  this.adminprofileRepository.update(id,updateAdminprofileDto);
     return this.findOne(id)
  }

  async remove(id: number) {
    return await  this.adminprofileRepository.delete(id);
  }
}
