import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Department } from '../departments/department.entity';

@Entity()
export class University {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => Department, department => department.university, { cascade: true })
  departments: Department[];
}
