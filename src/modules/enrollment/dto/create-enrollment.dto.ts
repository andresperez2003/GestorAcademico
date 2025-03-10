/**
 * @fileoverview DTO para Creación de Matrícula
 * @description Define la estructura de datos necesaria para crear una nueva matrícula.
 * Incluye validaciones para asegurar que los datos sean correctos antes de procesar la matrícula.
 * 
 * @module CreateEnrollmentDto
 */

import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

export class CreateEnrollmentDto {
  /**
   * Fecha en que se realiza la matrícula
   * @example "2024-03-10"
   * @description Debe ser una fecha válida y no puede estar vacía
   */
  @IsNotEmpty()
  @IsDate()
  enrollmentDate: Date;

  /**
   * ID del estudiante que se matricula
   * @example 1
   * @description Debe ser un número entero y no puede estar vacío
   */
  @IsNotEmpty()
  @IsInt()
  studentId: number;

  /**
   * ID del curso en el que se matricula
   * @example 1
   * @description Debe ser un número entero y no puede estar vacío
   */
  @IsNotEmpty()
  @IsInt()
  courseId: number;
}
