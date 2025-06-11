import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from 'src/auth/guards';
import { DatabaseModule } from 'src/database/database.module';
import { Profile } from './entities/profile.entity';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([ Profile])],
  controllers: [ProfilesController],
  providers: [ProfilesService,RolesGuard],
})
export class ProfilesModule {}
