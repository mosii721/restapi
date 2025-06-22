import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';

@Injectable()
export class AdminsService {

  constructor(@InjectRepository(Admin) private adminRepository:Repository<Admin>,
  @InjectRepository(Profile) private profileRepository:Repository<Profile>){}

  async create(createAdminDto: CreateAdminDto) {
    const existProfile  = await this.profileRepository.findOneBy({id: createAdminDto.adminprofileid});

    if(!existProfile){
      throw new NotFoundException(`Profile  with  id  ${createAdminDto.adminprofileid}  not found`);
    }
    const newAdmin = this.adminRepository.create({
      username: createAdminDto.username,
      lastlogin:createAdminDto.lastlogin,
      adminprofile:existProfile,
    })
    return  await this.adminRepository.save(newAdmin)
  }

  async findAll(name?: string) {
    const admin = await this.adminRepository.find({
      where:{adminprofile:{first_name:name},},
      relations:{adminprofile:true}
    });
    if(!admin){
      throw new NotFoundException('Admin not found')
    }
    return admin.map((admin) => {
      if(admin.adminprofile){
        const { password,hashedRefreshToken, ...safeAdmin} = admin.adminprofile
        admin.adminprofile = Object.assign(Object.create(Object.getPrototypeOf(admin.adminprofile)), safeAdmin)
      }
      return admin;
    });
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
