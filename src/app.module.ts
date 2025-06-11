import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { RoomsModule } from './rooms/rooms.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { UserfeedbacksModule } from './userfeedbacks/userfeedbacks.module';
import { AdminsModule } from './admins/admins.module';
import { ProfilesModule } from './profiles/profiles.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { UsersModule } from './users/users.module';
import { RoombookingsModule } from './roombookings/roombookings.module';
import { UseraccessModule } from './useraccess/useraccess.module';
import { LoggerMiddleware } from './logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { SeedModule } from './seed/seed.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import {Keyv, createKeyv} from '@keyv/redis';
import { CacheableMemory } from 'cacheable';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/guards';
import { LogsModule } from './logs/logs.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';



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
    ProfilesModule,
    RegistrationsModule,
    UsersModule,
    RoombookingsModule,
    UseraccessModule,
    DatabaseModule,
    SeedModule,
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
    AuthModule,
    LogsModule,
    ThrottlerModule.forRoot({
      throttlers:[{
        ttl:60000,
        limit:10,
        ignoreUserAgents:[/^curl\//,/^PostmanRuntime\//], // excludes them from rate-limiting
      }]
    })
  ],
  controllers: [],
  providers: [{
    provide: 'APP_INTERCEPTOR',
    useClass: CacheInterceptor,// global interceptor to cache responses
  },
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,// global guard to limit requests to 10 per minute
  },
  {
    provide: APP_GUARD,
    useClass: AtGuard,  // global guard to protect all routes with access token
  },
],
})
export class AppModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes('admins','profiles','complaints','courses','registrations','roombookings','rooms','useraccess','userfeedbacks','users')
  }
}
