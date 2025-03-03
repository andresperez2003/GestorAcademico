import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Student } from '../students/students.entity';
import { Course } from '../course/course.entity';
import { Evaluation } from '../evaluation/evaluation.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  enrollmentDate: Date;

  // Relación con Student
  @ManyToOne(() => Student, student => student.enrollments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentId' })
  student: Student;

  // Relación con Course
  @ManyToOne(() => Course, course => course.enrollments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course: Course;

  // Evaluaciones asociadas a la inscripción
  @OneToMany(() => Evaluation, evaluation => evaluation.enrollment)
  evaluations: Evaluation[];
}

