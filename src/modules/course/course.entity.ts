/**
 * @fileoverview Entidad de Curso
 * @description Define la estructura de datos para un curso en el sistema.
 * Esta entidad representa la información básica de un curso, sus relaciones
 * con profesores, prerrequisitos, horarios y matrículas.
 * 
 * @module Course
 */

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Professor } from '../professor/professor.entity';
import { Prerequisite } from '../prerequisite/prerequisite.entity';
import { Schedule } from '../schedule/schedule.entity';
import { Enrollment } from '../enrollment/enrollment.entity';

@Entity()
export class Course {
  /**
   * Identificador único del curso
   * @example 1
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Nombre del curso
   * @example "Programación Avanzada"
   */
  @Column({ length: 100 })
  name: string;

  /**
   * Descripción detallada del curso
   * @example "Curso que cubre conceptos avanzados de programación y diseño de software"
   */
  @Column({ length: 255 })
  description: string;

  /**
   * Relación muchos a uno con el profesor que imparte el curso
   * Un curso puede tener un profesor asignado (opcional)
   * Si se elimina el profesor, el campo se establece como NULL
   * @example { id: 1, name: "Juan Pérez" }
   */
  @ManyToOne(() => Professor, professor => professor.courses, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'professorId' })
  professor: Professor;

  /**
   * Relación uno a muchos con los prerrequisitos del curso
   * Lista de cursos que deben aprobarse antes de tomar este curso
   * @example [{ id: 1, name: "Programación Básica" }]
   */
  @OneToMany(() => Prerequisite, prerequisite => prerequisite.course)
  prerequisites: Prerequisite[];

  /**
   * Relación uno a muchos con los cursos que requieren este curso como prerrequisito
   * Lista de cursos que tienen este curso como prerrequisito
   * @example [{ id: 2, name: "Desarrollo Web" }]
   */
  @OneToMany(() => Prerequisite, prerequisite => prerequisite.prerequisite)
  requiredBy: Prerequisite[];

  /**
   * Relación uno a muchos con los horarios del curso
   * Lista de horarios en los que se imparte el curso
   * @example [{ id: 1, day: "Lunes", startTime: "08:00", endTime: "10:00" }]
   */
  @OneToMany(() => Schedule, schedule => schedule.course)
  schedules: Schedule[];

  /**
   * Relación uno a muchos con las matrículas del curso
   * Lista de estudiantes matriculados en el curso
   * @example [{ id: 1, student: { id: 1, name: "Ana García" } }]
   */
  @OneToMany(() => Enrollment, enrollment => enrollment.course)
  enrollments: Enrollment[];
}
