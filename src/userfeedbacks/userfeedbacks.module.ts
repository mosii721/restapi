import { Module } from '@nestjs/common';
import { UserfeedbacksService } from './userfeedbacks.service';
import { UserfeedbacksController } from './userfeedbacks.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userfeedback } from './entities/userfeedback.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([Userfeedback,User])],
  controllers: [UserfeedbacksController],
  providers: [UserfeedbacksService],
})
export class UserfeedbacksModule {}
