import { Module } from '@nestjs/common';
import { RoombookingsService } from './roombookings.service';
import { RoombookingsController } from './roombookings.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roombooking } from './entities/roombooking.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { RolesGuard } from 'src/auth/guards';
import { Profile } from 'src/profiles/entities/profile.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([Roombooking,Room,Profile,User])],
  controllers: [RoombookingsController],
  providers: [RoombookingsService,RolesGuard],
})
export class RoombookingsModule {}
