/**
 * @fileoverview Módulo de Evaluaciones
 * @description Configura y exporta el módulo de evaluaciones, incluyendo sus dependencias,
 * controladores y servicios. Este módulo maneja la gestión de calificaciones y evaluaciones
 * de estudiantes en cursos, incluyendo diferentes tipos de evaluación.
 * 
 * @module EvaluationModule
 */

import { Module } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluation } from './evaluation.entity';
import { EvaluationController } from './evaluation.controller';
import { Enrollment } from '../enrollment/enrollment.entity';
import { EvaluationType } from '../evaluation-type/evaluation-type.entity';

@Module({
  imports: [
    // Importa los repositorios de TypeORM necesarios para las entidades
    TypeOrmModule.forFeature([
      Evaluation,    // Entidad principal de evaluaciones
      Enrollment,    // Entidad de matrículas (relacionada)
      EvaluationType // Entidad de tipos de evaluación (relacionada)
    ])
  ],
  // Define el controlador que maneja las rutas HTTP
  controllers: [EvaluationController],
  // Define el servicio que contiene la lógica de negocio
  providers: [EvaluationService],
  // Exporta el servicio y el módulo TypeORM para uso en otros módulos
  exports: [EvaluationService, TypeOrmModule],
})
export class EvaluationModule {}
