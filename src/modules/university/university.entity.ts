import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class University {
  @PrimaryGeneratedColumn()
  id: number; // Renombrado a "id" para mayor claridad

  @Column({ length: 100 }) // Se aumentó el límite a 100 caracteres
  name: string;
}