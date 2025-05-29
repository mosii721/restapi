import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Adminprofile } from 'src/adminprofiles/entities/adminprofile.entity';

@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([Admin,Adminprofile])],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
