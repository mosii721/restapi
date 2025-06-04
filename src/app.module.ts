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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { SeedModule } from './seed/seed.module';
import { CacheMeModule } from './cache-me/cache-me.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import {Keyv, createKeyv} from '@keyv/redis';
import { CacheableMemory } from 'cacheable';


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
    CacheMeModule,
    CacheModule.registerAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      isGlobal:true,
      useFactory:(configService:ConfigService)  =>  {
        return {
          ttl:120000,
          stores:[
            new Keyv  ({
              store: new CacheableMemory ({ttl:30000,lruSize:5000}),
            }),
            createKeyv(configService.getOrThrow<string>('REDIS_URL')),
          ],
        };
      },
    }),
  ],
  controllers: [],
  providers: [{
    provide: 'APP_INTERCEPTOR',
    useClass: CacheInterceptor,
  }],
})
export class AppModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes('admins','adminprofiles','complaints','courses','registrations','roombookings','rooms','useraccess','userfeedbacks','userprofiles','users')
  }
}
