// prerequisite.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Course } from '../course/course.entity';

@Entity()
export class Prerequisite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, course => course.prerequisites, { onDelete: 'CASCADE' })
  course: Course;

  @ManyToOne(() => Course, course => course.requiredBy, { onDelete: 'CASCADE' })
  prerequisite: Course;
}