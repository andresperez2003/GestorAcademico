/**
 * @fileoverview DTO para Actualización de Matrícula
 * @description Define la estructura de datos necesaria para actualizar una matrícula existente.
 * Todos los campos son opcionales excepto courseId, permitiendo actualizaciones parciales.
 * Incluye validaciones para asegurar que los datos sean correctos.
 * 
 * @module UpdateEnrollmentDto
 */

import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateEnrollmentDto {
  /**
   * Nueva fecha de matrícula
   * @example "2024-03-10"
   * @description Debe ser una fecha válida y no puede estar vacía si se proporciona
   */
  @IsNotEmpty()
  @IsDate()
  enrollmentDate?: Date;

  /**
   * Nuevo ID del estudiante
   * @example 1
   * @description Debe ser un número entero y no puede estar vacío si se proporciona
   */
  @IsNotEmpty()
  @IsInt()
  studentId?: number;

  /**
   * ID del curso a actualizar
   * @example 1
   * @description Debe ser un número entero y no puede estar vacío
   */
  @IsNotEmpty()
  @IsInt()
  courseId: number;
}
