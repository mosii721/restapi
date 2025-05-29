import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Userprofile } from 'src/userprofiles/entities/userprofile.entity';


@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([User,Userprofile])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
