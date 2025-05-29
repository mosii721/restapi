import { Module } from '@nestjs/common';
import { RoombookingsService } from './roombookings.service';
import { RoombookingsController } from './roombookings.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roombooking } from './entities/roombooking.entity';
import { Room } from 'src/rooms/entities/room.entity';

@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([Roombooking,Room])],
  controllers: [RoombookingsController],
  providers: [RoombookingsService],
})
export class RoombookingsModule {}
