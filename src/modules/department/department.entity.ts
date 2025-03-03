import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { University } from '../university/university.entity';
import { Professor } from '../professor/professor.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({ length: 50 })
  name: string;

  @OneToMany(() => Professor, professor => professor.department, { cascade: true })
  professors: Professor[];

  @ManyToOne(() => University, university => university.departments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'universityId' }) 
  university: University;
}
