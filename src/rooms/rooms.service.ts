import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(@InjectRepository(Room) private roomRepository: Repository<Room> ){}

  async create(createRoomDto: CreateRoomDto) {
    return await  this.roomRepository.save(createRoomDto);
  }

  async findAll(search?: string) {
    if (search) {
      return await this.roomRepository.find({
        where:[{room_type:search}],
        relations:['roombooking']
      });
    }
    return await this.roomRepository.find({relations:['roombooking']});
  }

  async findOne(id: number) {
    return await  this.roomRepository.find({
      where:{id},
        relations:['roombooking']
    });
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    return await  this.roomRepository.update(id, updateRoomDto);
  }

  async remove(id: number) {
    return await  this.roomRepository.delete(id);
  }
}
