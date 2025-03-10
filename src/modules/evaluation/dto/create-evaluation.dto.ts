/**
 * @fileoverview DTO para Creación de Evaluación
 * @description Define la estructura de datos necesaria para crear una nueva evaluación.
 * Incluye validaciones para asegurar que los datos sean correctos antes de procesar la evaluación.
 * 
 * @module CreateEvaluationDto
 */

import { IsDate, IsNumber, IsInt, IsNotEmpty } from 'class-validator';

export class CreateEvaluationDto {
  /**
   * Fecha en que se realizó la evaluación
   * @example "2024-03-10"
   * @description Debe ser una fecha válida y no puede estar vacía
   */
  @IsNotEmpty()
  @IsDate()
  evaluationDate: Date;

  /**
   * Calificación obtenida en la evaluación
   * @example 8.5
   * @description Debe ser un número entre 0 y 5 y no puede estar vacío
   */
  @IsNotEmpty()
  @IsNumber()
  grade: number;

  /**
   * ID de la matrícula asociada a la evaluación
   * @example 1
   * @description Debe ser un número entero y no puede estar vacío
   */
  @IsNotEmpty()
  @IsInt()
  enrollmentId: number;

  /**
   * ID del tipo de evaluación
   * @example 1
   * @description Debe ser un número entero y no puede estar vacío
   */
  @IsNotEmpty()
  @IsInt()
  evaluationTypeId: number;
}
