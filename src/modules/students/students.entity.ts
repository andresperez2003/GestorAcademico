import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Enrollment } from '../enrollment/enrollment.entity';

@Entity()
export class Student {
  @PrimaryColumn({ length: 20 })  // Clave primaria
  identification: string;

  @Column({ length: 30 })  // Coincide con VARCHAR(30)
  firstName: string;

  @Column({ length: 30 })  // Coincide con VARCHAR(30)
  lastName: string;

  @Column({ type: 'date' })  // Coincide con DATE
  birthDate: Date;

  @OneToMany(() => Enrollment, enrollment => enrollment.student)
  enrollments: Enrollment[];
}
