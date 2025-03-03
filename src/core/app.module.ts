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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // ⚠️ Ajusta el tipo según tu DB (mysql, postgres, sqlite, etc.)
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'andres1004367716',
      database: 'academicmanager',
      entities: [University], // 📌 Incluye todas las entidades aquí
      synchronize: true, // ❗ Solo para desarrollo
      autoLoadEntities: true, // 🔹 Alternativa para cargar entidades automáticamente
    }),
    UniversityModule,
    DepartmentsModule,
    StudentsModule,
    EvaluationTypeModule,
    CourseModule,
    PrerequisiteModule,
    ProfessorModule,
    ScheduleModule
  ],
})
export class AppModule {}
