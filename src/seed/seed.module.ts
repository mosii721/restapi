import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/admins/entities/admin.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Complaint } from 'src/complaints/entities/complaint.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Registration } from 'src/registrations/entities/registration.entity';
import { Roombooking } from 'src/roombookings/entities/roombooking.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Useraccess } from 'src/useraccess/entities/useraccess.entity';
import { Userfeedback } from 'src/userfeedbacks/entities/userfeedback.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ Admin,Profile,Complaint,Course,Registration,Roombooking,Room,Useraccess,Userfeedback,User])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
