import { Module } from '@nestjs/common';
import { AdminprofilesService } from './adminprofiles.service';
import { AdminprofilesController } from './adminprofiles.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adminprofile } from './entities/adminprofile.entity';

@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([ Adminprofile])],
  controllers: [AdminprofilesController],
  providers: [AdminprofilesService],
})
export class AdminprofilesModule {}
