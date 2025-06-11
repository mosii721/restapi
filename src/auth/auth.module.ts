import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { PassportModule } from "@nestjs/passport";
import { AtStrategy, RtStrategy } from './strategies';



@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([Profile]),JwtModule.register({
    global:true,
  }),
  PassportModule,//register passport module for strategies
],

  controllers: [AuthController],
  providers: [AuthService,AtStrategy,RtStrategy],
})
export class AuthModule {}
