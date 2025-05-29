import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateUseraccessDto } from './dto/create-useraccess.dto';
import { UpdateUseraccessDto } from './dto/update-useraccess.dto';
import { Useraccess } from './entities/useraccess.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UseraccessService {

  constructor(@InjectRepository(Useraccess) private useraccessRepository:Repository<Useraccess>,
  @InjectRepository(User) private userRepository:Repository<User>){}

  
async create(createUseraccessDto: CreateUseraccessDto) {
const existUser = await this.userRepository.findOneBy({ id: createUseraccessDto.user_id });

if (!existUser) {
  throw new NotFoundException(`Profile with id ${createUseraccessDto.user_id} not found`);
}


const existingAccess = await this.useraccessRepository.findOne({
  where: { users: { id: existUser.id } },
  relations: ['users'],
});

if (existingAccess) {
  await this.useraccessRepository.increment(
    { users: { id: existUser.id } },
    'login_count',
    1
  );
  return { message: 'Login count incremented' };
}


const newUserAccess = this.useraccessRepository.create({
  login_count: 1,
  users: existUser,
});

return await this.useraccessRepository.save(newUserAccess);
}

  async findOne(id: number) {
    return await  this.useraccessRepository.find({
      where:{id},
        relations:['users']
    });
  }

  async update(id: number, updateUseraccessDto: UpdateUseraccessDto) {
    return await this.useraccessRepository.update(id,updateUseraccessDto);
  }

  async remove(id: number) {
    return await  this.useraccessRepository.delete(id);
  }
}
