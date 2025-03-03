import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Course } from '../course/course.entity';

@Entity()
export class Prerequisite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, (course) => course.prerequisites, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseToTake' }) // 👈 Asegura que este nombre coincide con la base de datos
  course: Course;

  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'prerequisiteCourse' }) // 👈 Este es el curso que es prerrequisito
  prerequisite: Course;
}
