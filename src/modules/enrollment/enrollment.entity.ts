/**
 * @fileoverview Entidad de Matrícula
 * @description Define la estructura de datos para una matrícula en el sistema.
 * Esta entidad representa la inscripción de un estudiante en un curso específico,
 * incluyendo la fecha de matrícula y las evaluaciones asociadas.
 * 
 * @module Enrollment
 */

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Student } from '../students/students.entity';
import { Course } from '../course/course.entity';
import { Evaluation } from '../evaluation/evaluation.entity';

@Entity()
export class Enrollment {
  /**
   * Identificador único de la matrícula
   * @example 1
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Fecha en que se realizó la matrícula
   * @example "2024-03-10"
   */
  @Column({ type: 'date' })
  enrollmentDate: Date;

  /**
   * Relación muchos a uno con el estudiante
   * Cada matrícula pertenece a un estudiante
   * Si se elimina el estudiante, se eliminan todas sus matrículas
   * @example { id: 1, name: "Juan Pérez" }
   */
  @ManyToOne(() => Student, student => student.enrollments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentId' })
  student: Student;
  
  /**
   * ID del estudiante (redundante pero útil para consultas directas)
   * @example 1
   */
  @Column()
  studentId: number;
  
  /**
   * Relación muchos a uno con el curso
   * Cada matrícula pertenece a un curso
   * Si se elimina el curso, se eliminan todas sus matrículas
   * @example { id: 1, name: "Programación Avanzada" }
   */
  @ManyToOne(() => Course, course => course.enrollments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course: Course;
  
  /**
   * ID del curso (redundante pero útil para consultas directas)
   * @example 1
   */
  @Column()
  courseId: number;
  
  /**
   * Relación uno a muchos con las evaluaciones
   * Una matrícula puede tener múltiples evaluaciones
   * @example [{ id: 1, score: 8.5, type: "Examen Parcial" }]
   */
  @OneToMany(() => Evaluation, evaluation => evaluation.enrollment)
  evaluations: Evaluation[];
}

