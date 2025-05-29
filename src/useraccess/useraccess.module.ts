import { Module } from '@nestjs/common';
import { UseraccessService } from './useraccess.service';
import { UseraccessController } from './useraccess.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Useraccess } from './entities/useraccess.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([Useraccess,User])],
  controllers: [UseraccessController],
  providers: [UseraccessService],
})
export class UseraccessModule {}
