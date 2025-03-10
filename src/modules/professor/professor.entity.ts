// professor.entity.ts
import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Department } from '../department/department.entity';
import { Course } from '../course/course.entity';

@Entity()
export class Professor {
  @PrimaryColumn({ length: 10 })
  identification: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @OneToMany(() => Course, course => course.professor, { cascade: true })
  courses: Course[];

  @ManyToOne(() => Department, department => department.professors, { eager: true })
  @JoinColumn({ name: 'departmentId' })
  department: Department;
}