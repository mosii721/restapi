import { Module } from '@nestjs/common';
import { UserprofilesService } from './userprofiles.service';
import { UserprofilesController } from './userprofiles.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userprofile } from './entities/userprofile.entity';

@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([ Userprofile])],
  controllers: [UserprofilesController],
  providers: [UserprofilesService],
})
export class UserprofilesModule {}
