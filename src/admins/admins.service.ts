import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { Adminprofile } from 'src/adminprofiles/entities/adminprofile.entity';

@Injectable()
export class AdminsService {

  constructor(@InjectRepository(Admin) private adminRepository:Repository<Admin>,
  @InjectRepository(Adminprofile) private adminprofileRepository:Repository<Adminprofile>){}

  async create(createAdminDto: CreateAdminDto) {
    const existProfile  = await this.adminprofileRepository.findOneBy({id: createAdminDto.adminprofileid});

    if(!existProfile){
      throw new NotFoundException(`Profile  with  id  ${createAdminDto.adminprofileid}  not found`);
    }
    const newAdmin = this.adminRepository.create({
      username: createAdminDto.username,
      password: createAdminDto.password,
      lastlogin:createAdminDto.lastlogin,
      adminprofile:existProfile,
    })
    return  await this.adminRepository.save(newAdmin)
  }

  async findAll(name?: string) {
    if (name) {
      return await  this.adminRepository.find({
        where:{adminprofile:{first_name:name},},
        relations:['adminprofile']
      });
    }
    return await this.adminRepository.find({relations:['adminprofile']});
  }

  async findOne(id: number) {
    return await  this.adminRepository.find({
      where:{id},
        relations:['adminprofile']
    });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    return await this.adminRepository.update(id,updateAdminDto);
  }

  async remove(id: number) {
    return await  this.adminRepository.delete(id);
  }
}
