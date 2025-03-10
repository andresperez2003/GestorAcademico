/**
 * @fileoverview Módulo de Matrículas
 * @description Configura y exporta el módulo de matrículas, incluyendo sus dependencias,
 * controladores y servicios. Este módulo maneja la inscripción de estudiantes en cursos,
 * incluyendo la validación de prerrequisitos y la gestión de evaluaciones.
 * 
 * @module EnrollmentModule
 */

import { Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './enrollment.entity';
import { EnrollmentService } from './enrollment.service';
import { CourseModule } from '../course/course.module';
import { PrerequisiteModule } from '../prerequisite/prerequisite.module';
import { EvaluationModule } from '../evaluation/evaluation.module';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [
    // Importa el repositorio de TypeORM para la entidad Enrollment
    TypeOrmModule.forFeature([Enrollment]),
    // Importa módulos necesarios para la gestión de cursos
    CourseModule,
    // Importa módulos necesarios para la validación de prerrequisitos
    PrerequisiteModule,
    // Importa módulos necesarios para la gestión de evaluaciones
    EvaluationModule,
    // Importa módulos necesarios para la gestión de estudiantes
    StudentsModule,
  ],
  // Define el controlador que maneja las rutas HTTP
  controllers: [EnrollmentController],
  // Define el servicio que contiene la lógica de negocio
  providers: [EnrollmentService],
  // Exporta el servicio para que pueda ser usado por otros módulos
  exports: [EnrollmentService],
})
export class EnrollmentModule {}
