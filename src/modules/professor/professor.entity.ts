/**
 * @fileoverview Entidad de Profesor
 * @description Define la estructura de datos para un profesor en el sistema.
 * Esta entidad representa la información básica de un profesor, su relación
 * con el departamento al que pertenece y los cursos que imparte.
 * 
 * @module Professor
 */

// professor.entity.ts
import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Department } from '../department/department.entity';
import { Course } from '../course/course.entity';

@Entity()
export class Professor {
  /**
   * Identificación única del profesor (puede ser número de documento, carnet, etc.)
   * @example "P001"
   */
  @PrimaryColumn({ length: 20 })
  identification: string;

  /**
   * Nombre(s) del profesor
   * @example "María José"
   */
  @Column({ length: 100 })
  firstName: string;

  /**
   * Apellidos del profesor
   * @example "Rodríguez Martínez"
   */
  @Column({ length: 100 })
  lastName: string;

  /**
   * Relación uno a muchos con los cursos que imparte el profesor
   * Un profesor puede impartir múltiples cursos
   * @example [curso1, curso2, curso3]
   */
  @OneToMany(() => Course, course => course.professor, { cascade: true })
  courses: Course[];

  /**
   * Relación muchos a uno con el departamento al que pertenece el profesor
   * Cada profesor debe pertenecer a un departamento
   * @example { id: 1, name: "Departamento de Informática" }
   */
  @ManyToOne(() => Department, department => department.professors, { eager: true })
  @JoinColumn({ name: 'departmentId' })
  department: Department;
}