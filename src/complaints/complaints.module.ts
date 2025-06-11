import { Module } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { ComplaintsController } from './complaints.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complaint } from './entities/complaint.entity';
import { User } from 'src/users/entities/user.entity';
import { RolesGuard } from 'src/auth/guards';
import { Profile } from 'src/profiles/entities/profile.entity';

@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([Complaint,User,Profile])],
  controllers: [ComplaintsController],
  providers: [ComplaintsService,RolesGuard],
})
export class ComplaintsModule {}
