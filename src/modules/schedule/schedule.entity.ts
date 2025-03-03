// schedule.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Course } from '../course/course.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column({ length: 10 })
  dayOfWeek: string;

  @ManyToOne(() => Course, course => course.schedules, { onDelete: 'CASCADE' })
  course: Course;
}