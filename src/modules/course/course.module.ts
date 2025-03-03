// course.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { ProfessorModule } from '../professor/professor.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), ProfessorModule],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService, TypeOrmModule],
})
export class CourseModule {}