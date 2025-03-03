import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { University } from '../modules/university/university.entity';
import { UniversityModule } from '../modules/university/university.module';
import { StudentsModule } from 'src/modules/students/students.module';
import { EvaluationTypeModule } from 'src/modules/evaluation-type/evaluation-type.module';
import { DepartmentsModule } from 'src/modules/department/departments.module';
import { CourseModule } from 'src/modules/course/course.module';
import { PrerequisiteModule } from 'src/modules/prerequisite/prerequisite.module';
import { ProfessorModule } from 'src/modules/professor/professor.module';
import { ScheduleModule } from 'src/modules/schedule/schedule.module';
import { EnrollmentModule } from 'src/modules/enrollment/enrollment.module';
import { EvaluationModule } from 'src/modules/evaluation/evaluation.module';
import { Department } from 'src/modules/department/department.entity';
import { Student } from 'src/modules/students/students.entity';
import { Evaluation } from 'src/modules/evaluation/evaluation.entity';
import { Course } from 'src/modules/course/course.entity';
import { Prerequisite } from 'src/modules/prerequisite/prerequisite.entity';
import { Professor } from 'src/modules/professor/professor.entity';
import { Schedule } from 'src/modules/schedule/schedule.entity';
import { Enrollment } from 'src/modules/enrollment/enrollment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', 
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'andres1004367716',
      database: 'academicmanager',
      entities: [University, Department, Student, Evaluation, Course,Prerequisite, Professor, Schedule,Enrollment,Evaluation], 
      autoLoadEntities: true,
    }),
    UniversityModule,
    DepartmentsModule,
    StudentsModule,
    EvaluationTypeModule,
    CourseModule,
    PrerequisiteModule,
    ProfessorModule,
    ScheduleModule,
    EnrollmentModule,
    EvaluationModule
  ],
})
export class AppModule {}
