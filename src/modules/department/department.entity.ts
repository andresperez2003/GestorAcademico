/**
 * @fileoverview Entidad de Departamento
 * @description Define la estructura de datos para un departamento en el sistema.
 * Esta entidad representa la información básica de un departamento, su relación
 * con la universidad a la que pertenece y los profesores que lo integran.
 * 
 * @module Department
 */

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { University } from '../university/university.entity';
import { Professor } from '../professor/professor.entity';

@Entity()
export class Department {
  /**
   * Identificador único del departamento
   * @example 1
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Nombre del departamento
   * @example "Departamento de Informática"
   */
  @Column({ length: 50 })
  name: string;

  /**
   * Relación uno a muchos con los profesores del departamento
   * Un departamento puede tener múltiples profesores
   * @example [{ id: 1, name: "Juan Pérez" }, { id: 2, name: "María García" }]
   */
  @OneToMany(() => Professor, professor => professor.department, { cascade: true })
  professors: Professor[];

  /**
   * Relación muchos a uno con la universidad
   * Cada departamento pertenece a una universidad
   * Si se elimina la universidad, se eliminan todos sus departamentos
   * @example { id: 1, name: "Universidad Autónoma de Madrid" }
   */
  @ManyToOne(() => University, university => university.departments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'universityId' })
  university: University;
}
