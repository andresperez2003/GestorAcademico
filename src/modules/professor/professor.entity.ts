// professor.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Department } from '../department/department.entity';

@Entity()
export class Professor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @ManyToOne(() => Department, department => department.professors, { onDelete: 'CASCADE' })
  department: Department;
}