import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { RolesGuard } from 'src/auth/guards';
import { Profile } from 'src/profiles/entities/profile.entity';

@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([Room,Profile])],
  controllers: [RoomsController],
  providers: [RoomsService,RolesGuard],
})
export class RoomsModule {}
