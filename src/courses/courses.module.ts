import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { RolesGuard } from 'src/auth/guards';
import { Profile } from 'src/profiles/entities/profile.entity';


@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([Course,Profile])],
  controllers: [CoursesController],
  providers: [CoursesService,RolesGuard],
})
export class CoursesModule {}
