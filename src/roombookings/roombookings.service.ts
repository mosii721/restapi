import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateRoombookingDto } from './dto/create-roombooking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roombooking } from './entities/roombooking.entity';
import { Repository } from 'typeorm';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RoombookingsService {

  constructor(@InjectRepository(Roombooking) private roombookingRepository:Repository<Roombooking>,
  @InjectRepository(Room) private roomRepository:Repository<Room>,
  @InjectRepository(User) private userRepository:Repository<User>,){}

  async create(createRoombookingDto: CreateRoombookingDto) {
    const existRoom  = await this.roomRepository.findOneBy({id: createRoombookingDto.room_id});
    const existUser  = await this.userRepository.findOneBy({id: createRoombookingDto.user_id});
    
        if(!existRoom || !existUser){
          throw new NotFoundException(`Room  with  id  ${createRoombookingDto.room_id}  &  ${createRoombookingDto.user_id}  not found`);
        }
        const newRoom = this.roombookingRepository.create({
          users:existUser,
          rooms:existRoom,
        })
        return  await this.roombookingRepository.save(newRoom)
      }
    

  async findAll() {
    return await this.roombookingRepository.find({relations:['rooms','users']});
  }

  async findOne(id: number) {
    return await  this.roombookingRepository.find({
      where:{id},
        relations:['rooms','users']
    });
  }

  async remove(id: number) {
    return await  this.roombookingRepository.delete(id);
  }
}
