import { Module } from '@nestjs/common';
import { UseraccessService } from './useraccess.service';
import { UseraccessController } from './useraccess.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Useraccess } from './entities/useraccess.entity';
import { User } from 'src/users/entities/user.entity';
import { RolesGuard } from 'src/auth/guards';
import { Profile } from 'src/profiles/entities/profile.entity';

@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([Useraccess,User,Profile])],
  controllers: [UseraccessController],
  providers: [UseraccessService,RolesGuard],
})
export class UseraccessModule {}
