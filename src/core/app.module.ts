import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { University } from '../modules/university/university.entity';
import { UniversityModule } from '../modules/university/university.module';
import { DepartmentsModule } from '../modules/departments/departments.module';
import { StudentsModule } from 'src/modules/students/students.module';
import { EvaluationTypeModule } from 'src/modules/evaluation-type/evaluation-type.module';

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
    EvaluationTypeModule
  ],
})
export class AppModule {}
