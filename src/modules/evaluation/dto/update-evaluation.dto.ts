/**
 * @fileoverview DTO para Actualización de Evaluación
 * @description Define la estructura de datos necesaria para actualizar una evaluación existente.
 * Todos los campos son opcionales, permitiendo actualizaciones parciales.
 * Incluye validaciones para asegurar que los datos sean correctos.
 * 
 * @module UpdateEvaluationDto
 */

import { IsDate, IsNumber, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateEvaluationDto {
  /**
   * Nueva fecha de evaluación
   * @example "2024-03-10"
   * @description Debe ser una fecha válida y no puede estar vacía si se proporciona
   */
  @IsNotEmpty()
  @IsDate()
  evaluationDate?: Date;

  /**
   * Nueva calificación
   * @example 8.5
   * @description Debe ser un número entre 0 y 5 y no puede estar vacío si se proporciona
   */
  @IsNotEmpty()
  @IsNumber()
  grade?: number;

  /**
   * Nuevo ID de la matrícula
   * @example 1
   * @description Debe ser un número entero y no puede estar vacío si se proporciona
   */
  @IsNotEmpty()
  @IsInt()
  enrollmentId?: number;

  /**
   * Nuevo ID del tipo de evaluación
   * @example 1
   * @description Debe ser un número entero y no puede estar vacío si se proporciona
   */
  @IsNotEmpty()
  @IsInt()
  evaluationTypeId?: number;
}
