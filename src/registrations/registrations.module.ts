import { Module } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { RegistrationsController } from './registrations.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './entities/registration.entity';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';
import { RolesGuard } from 'src/auth/guards';
import { Profile } from 'src/profiles/entities/profile.entity';

@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([Registration,User,Course,Profile])],
  controllers: [RegistrationsController],
  providers: [RegistrationsService,RolesGuard],
})
export class RegistrationsModule {}
