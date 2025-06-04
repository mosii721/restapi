import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateRoombookingDto } from './dto/create-roombooking.dto';
import { UpdateRoombookingDto } from './dto/update-roombooking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roombooking } from './entities/roombooking.entity';
import { Repository } from 'typeorm';
import { Room } from 'src/rooms/entities/room.entity';

@Injectable()
export class RoombookingsService {

  constructor(@InjectRepository(Roombooking) private roombookingRepository:Repository<Roombooking>,
  @InjectRepository(Room) private roomRepository:Repository<Room>,){}

  async create(createRoombookingDto: CreateRoombookingDto) {
    const existRoom  = await this.roomRepository.findOneBy({id: createRoombookingDto.room_id});
    
        if(!existRoom){
          throw new NotFoundException(`Profile  with  id  ${createRoombookingDto.room_id}  not found`);
        }
        const newRoom = this.roombookingRepository.create({
          user_id:createRoombookingDto.user_id,
          rooms:existRoom,
        })
        return  await this.roombookingRepository.save(newRoom)
      }
    

  async findAll() {
    return await this.roombookingRepository.find({relations:['rooms']});
  }

  async findOne(id: number) {
    return await  this.roombookingRepository.find({
      where:{id},
        relations:['rooms']
    });
  }

  async update(id: number, updateRoombookingDto: UpdateRoombookingDto) {
    return await this.roombookingRepository.update(id,updateRoombookingDto);
  }

  async remove(id: number) {
    return await  this.roombookingRepository.delete(id);
  }
}
