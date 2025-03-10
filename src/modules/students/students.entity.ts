/**
 * @fileoverview Entidad de Estudiante
 * @description Define la estructura de datos para un estudiante en el sistema.
 * Esta entidad representa la información básica de un estudiante y su relación
 * con las matrículas en las que está inscrito.
 * 
 * @module Student
 */

import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Enrollment } from '../enrollment/enrollment.entity';

@Entity()
export class Student {
  /**
   * Identificación única del estudiante (puede ser número de documento, carnet, etc.)
   * @example "1234567890"
   */
  @PrimaryColumn({ length: 20 })  // Clave primaria
  identification: string;

  /**
   * Nombre(s) del estudiante
   * @example "Juan Carlos"
   */
  @Column({ length: 30 })  // Coincide con VARCHAR(30)
  firstName: string;

  /**
   * Apellidos del estudiante
   * @example "González Pérez"
   */
  @Column({ length: 30 })  // Coincide con VARCHAR(30)
  lastName: string;

  /**
   * Fecha de nacimiento del estudiante
   * @example "2000-01-01"
   */
  @Column({ type: 'date' })  // Coincide con DATE
  birthDate: Date;

  /**
   * Relación uno a muchos con las matrículas del estudiante
   * Un estudiante puede tener múltiples matrículas en diferentes cursos
   */
  @OneToMany(() => Enrollment, enrollment => enrollment.student)
  enrollments: Enrollment[];
}

