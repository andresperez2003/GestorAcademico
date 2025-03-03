// professor.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Department } from '../department/department.entity';
import { Course } from '../course/course.entity';

@Entity()
export class Professor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @OneToMany(() => Course, course => course.professor, { cascade: true })
  courses: Course[];

  @ManyToOne(() => Department, department => department.professors, { onDelete: 'CASCADE' })
  department: Department;
}