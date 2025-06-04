import { Module } from '@nestjs/common';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports:[ConfigModule],
            useFactory:async (configService:ConfigService) => ({
                type:'postgres',
                host:configService.getOrThrow<string>('DB_HOST'),
                port:configService.getOrThrow<number>('DB_PORT'),
                username:configService.getOrThrow<string>('DB_USER'),
                password:configService.getOrThrow<string>('DB_PASSWORD'),
                database:configService.getOrThrow<string>('DB_DATABASE'),
                autoLoadEntities:true,
                synchronize:configService.getOrThrow<boolean>('DB_SYNC',true),
                logging:configService.getOrThrow<boolean>('DB_LOGGING',false),
                migrations:[__dirname + '/migrations/**/*{.ts,.js}'],
            }),
            inject:[ConfigService]
        }),
    ],
    providers:[],
})
export class DatabaseModule {}
