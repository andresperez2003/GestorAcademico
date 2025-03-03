// course.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Professor } from '../professor/professor.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @ManyToOne(() => Professor, professor => professor.courses, { onDelete: 'SET NULL' })
  professor: Professor;
}
