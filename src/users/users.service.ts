import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';


@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository:Repository<User>,
    @InjectRepository(Profile) private profileRepository:Repository<Profile>,){}

  async create(createUserDto: CreateUserDto) {
    const existProfile  = await this.profileRepository.findOneBy({id: createUserDto.userprofileid});
    
        if(!existProfile){
          throw new NotFoundException(`Profile  with  id  ${createUserDto.userprofileid}  not found`);
        }
        const newUser = this.userRepository.create({
          username:createUserDto.username,
          lastlogin:createUserDto.lastlogin,
          userprofile:existProfile,
        })
        return  await this.userRepository.save(newUser)
      }

  async findAll(name?: string) {
    if (name) {
      return await  this.userRepository.find({
        where:{userprofile:{first_name:name},},
        relations:['userprofile','registration','userfeedback','complaint','useraccess','roombooking']
      });
    }
    return await this.userRepository.find({relations:['userprofile','registration','userfeedback','complaint','useraccess','roombooking']});
  }

  async findOne(id: number) {
    return await  this.userRepository.find({
      where:{id},
        relations:['userprofile','registration','userfeedback','complaint','roombooking']
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id,updateUserDto);
  }

  async remove(id: number) {
    return await  this.userRepository.delete(id);
  }


}

