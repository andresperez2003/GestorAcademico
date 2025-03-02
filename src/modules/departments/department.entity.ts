import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { University } from '../university/university.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({ length: 50 })
  name: string;

  @ManyToOne(() => University, university => university.departments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'universityId' }) 
  university: University;
}
