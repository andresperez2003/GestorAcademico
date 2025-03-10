import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // 👈 Importa ConfigModule
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

// 👇 Importamos los módulos de autenticación
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 👈 Habilita el uso de variables de entorno
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [University, Department, Student, Evaluation, Course, Prerequisite, Professor, Schedule, Enrollment],
      autoLoadEntities: true
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
    EvaluationModule,
    AuthModule,  // 👈 Agregamos autenticación
    UsersModule, // 👈 Agregamos gestión de usuarios
  ],
})
export class AppModule {}
