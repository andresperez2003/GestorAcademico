import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Course } from '../course/course.entity';

@Entity()
export class Prerequisite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, (course) => course.prerequisites, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseToTake' })
  course: Course;

  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'prerequisiteCourse' }) 
  prerequisite: Course;
}
