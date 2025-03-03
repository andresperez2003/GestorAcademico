// prerequisite.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prerequisite } from './prerequisite.entity';
import { PrerequisiteService } from './prerequisite.service';
import { PrerequisiteController } from './prerequisite.controller';
import { CourseModule } from '../course/course.module'; // Importar CourseModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Prerequisite]), // Importar repositorio
    CourseModule,
  ],
  controllers: [PrerequisiteController],
  providers: [PrerequisiteService],
  exports: [PrerequisiteService,TypeOrmModule],
})
export class PrerequisiteModule {}