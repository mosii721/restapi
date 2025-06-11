import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as Bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {

  constructor(@InjectRepository(Profile) private profileRepository:Repository<Profile>){}

    private async hashData(data:string):Promise<string>{
      const salt = await Bcrypt.genSalt(10);
      return Bcrypt.hash(data,salt)
    }

    private excludePassword(profile:Profile):Partial<Profile>{
      const {password,hashedRefreshToken,...rest} = profile;
      return  rest;
    }
  

  async create(createProfileDto: CreateProfileDto):Promise<Partial<Profile>> {
    const existingProfile = await this.profileRepository.findOne({
      where:{email:createProfileDto.email},
      select:['id']
    })

    if(existingProfile){
      throw new Error(`profile with email ${createProfileDto.email}  already exists`)
    }

    const newProfile:Partial<Profile> ={
      first_name:createProfileDto.first_name,
      last_name:createProfileDto.last_name,
      email:createProfileDto.email,
      phone_number:createProfileDto.phone_number,
      role:createProfileDto.role,
      password:await this.hashData(createProfileDto.password),
    }

    const savedProfile =  await this.profileRepository.save(newProfile)

    return  this.excludePassword(savedProfile);
  }
  

  async findAll(email?: string): Promise<Partial<Profile>[]> {
    let profiles:Profile[];
    if (email) {
      profiles= await this.profileRepository.find({
        where:{email},
        relations:['admin','user']
      }) ;
    }else{
      profiles=await this.profileRepository.find({
        relations:['admin','user']
      }) ;
    }
    console.log('adminfoud');
    return  profiles.map((profile) => this.excludePassword(profile));
  }

  async findOne(id: number) {
    return await this.profileRepository.findOneBy({id}).then((profile)=>{
      if(!profile){
        return  `Profile  with  id  ${id} not found`
      }
      return  this.excludePassword(profile);
    }).catch((error)=>{
      console.error('Error finding profile:',error);
      throw new Error(`Profile  with  id  ${id} not found`);
    });;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
     await  this.profileRepository.update(id,updateProfileDto);
     return this.findOne(id)
  }

  async remove(id: number) {
    return await  this.profileRepository.delete(id);
  }
}
