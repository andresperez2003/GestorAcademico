import { Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './enrollment.entity';
import { EnrollmentService } from './enrollment.service';
import { CourseModule } from '../course/course.module';
import { PrerequisiteModule } from '../prerequisite/prerequisite.module';
import { EvaluationModule } from '../evaluation/evaluation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enrollment]),
    CourseModule,
    PrerequisiteModule,
    EvaluationModule, // ✅ Importado correctamente
  ],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
  exports: [EnrollmentService], 
})
export class EnrollmentModule {}
