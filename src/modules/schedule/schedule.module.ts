// schedule.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './schedule.entity';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { Course } from '../course/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule,Course])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService,TypeOrmModule],
})
export class ScheduleModule {}