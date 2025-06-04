import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common';
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
import { LoggerMiddleware } from './logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { SeedModule } from './seed/seed.module';


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
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes('admins','adminprofiles','complaints','courses','registrations','roombookings','rooms','useraccess','userfeedbacks','userprofiles','users')
  }
}
