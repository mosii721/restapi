import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { RoomsModule } from './rooms/rooms.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { UserfeedbacksModule } from './userfeedbacks/userfeedbacks.module';
import { AdminsModule } from './admins/admins.module';
import { AdminprofilesModule } from './adminprofiles/adminprofiles.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { UsersModule } from './users/users.module';
import { UserprofilesModule } from './userprofiles/userprofiles.module';
import { RoombookingsModule } from './roombookings/roombookings.module';
import { UseraccessModule } from './useraccess/useraccess.module';
import { MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env',
    }),
    CoursesModule,
    RoomsModule,
    ComplaintsModule,
    UserfeedbacksModule,
    AdminsModule,
    AdminprofilesModule,
    RegistrationsModule,
    UsersModule,
    UserprofilesModule,
    RoombookingsModule,
    UseraccessModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes('admins')
  }
}
