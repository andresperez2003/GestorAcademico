/**
 * @fileoverview Entidad de Evaluación
 * @description Define la estructura de datos para una evaluación en el sistema.
 * Esta entidad representa una calificación asignada a un estudiante en un curso específico,
 * incluyendo la fecha de evaluación, la calificación y el tipo de evaluación.
 * 
 * @module Evaluation
 */

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Enrollment } from '../enrollment/enrollment.entity';
import { EvaluationType } from '../evaluation-type/evaluation-type.entity';

@Entity()
export class Evaluation {
  /**
   * Identificador único de la evaluación
   * @example 1
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Fecha en que se realizó la evaluación
   * @example "2024-03-10"
   */
  @Column({ type: 'date' })
  evaluationDate: Date;

  /**
   * Calificación obtenida en la evaluación
   * @example 8.5
   * @description Valor numérico entre 0 y 5
   */
  @Column({ type: 'float' })
  grade: number;

  /**
   * Relación muchos a uno con la matrícula
   * Cada evaluación pertenece a una matrícula específica
   * Si se elimina la matrícula, se eliminan todas sus evaluaciones
   * @example { id: 1, studentId: 1, courseId: 1 }
   */
  @ManyToOne(() => Enrollment, enrollment => enrollment.evaluations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'enrollmentId' })
  enrollment: Enrollment;

  /**
   * Relación muchos a uno con el tipo de evaluación
   * Cada evaluación tiene un tipo específico (parcial, final, quiz, etc.)
   * Si se elimina el tipo de evaluación, se eliminan todas las evaluaciones de ese tipo
   * @example { id: 1, name: "Examen Parcial" }
   */
  @ManyToOne(() => EvaluationType, evaluationType => evaluationType.evaluations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'evaluationTypeId' })
  evaluationType: EvaluationType;
}
