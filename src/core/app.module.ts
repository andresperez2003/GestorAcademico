import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 👈 Importa ConfigModule
import { University } from '../modules/university/university.entity';
import { UniversityModule } from '../modules/university/university.module';
import { StudentsModule } from '../modules/students/students.module';
import { EvaluationTypeModule } from '../modules/evaluation-type/evaluation-type.module';
import { DepartmentsModule } from '../modules/department/departments.module';
import { CourseModule } from '../modules/course/course.module';
import { PrerequisiteModule } from '../modules/prerequisite/prerequisite.module';
import { ProfessorModule } from '../modules/professor/professor.module';
import { ScheduleModule } from '../modules/schedule/schedule.module';
import { EnrollmentModule } from '../modules/enrollment/enrollment.module';
import { EvaluationModule } from '../modules/evaluation/evaluation.module';


import { Department } from 'src/modules/department/department.entity';
import { Student } from 'src/modules/students/students.entity';
import { Evaluation } from 'src/modules/evaluation/evaluation.entity';
import { Course } from 'src/modules/course/course.entity';
import { Prerequisite } from 'src/modules/prerequisite/prerequisite.entity';
import { Professor } from 'src/modules/professor/professor.entity';
import { Schedule } from 'src/modules/schedule/schedule.entity';
import { Enrollment } from 'src/modules/enrollment/enrollment.entity';

// 👇 Importamos los módulos de autenticación
import { AuthModule } from '../modules/auth/auth.module';
import { UsersModule } from '../modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [`${process.env.NODE_ENV}.env`] }), // 👈 Habilita el uso de variables de entorno
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // UseFactory is a function that returns an
      // object
      // Inject the ConfigService to access the envs
      useFactory: (configService: ConfigService) => ({
        // Type of the database
        // Access through the ConfigService
        // Default is sqlite (if no env found)
        type: configService.get<
          'mysql' | 'postgres' | 'sqlite' | 'mssql' | 'oracle'
        >('DB_TYPE') ?? 'sqlite',

        // Host of the database
        // Access through the ConfigService
        host: configService.get<string>('DB_HOST_NAME'),

        // Port of the database
        // Access through the ConfigService
        port: configService.get<number>('DB_PORT'),

        // Username of the database
        // Access through the ConfigService
        username: configService.get<string>('DATABASE_USER'),

        // Password of the database
        // Access through the ConfigService
        password: configService.get<string>('DATABASE_PASSWORD'),

        // Name of the database
        // Access through the ConfigService
        database: configService.get<string>('DATABASE_NAME'),

        // Entities to use
        // This loads all the files with the extension
        // .entity.ts or .entity.js
        // In this way, the entities are automatically
        // turned into tables in the database
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],

        // Synchronize the database
        // This will create the tables if they don't
        // exist
        // It's recommended to set this to false in
        // production
        synchronize: true,
      }),
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
