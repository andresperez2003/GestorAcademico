import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Professor } from '../professor/professor.entity';
import { Prerequisite } from '../prerequisite/prerequisite.entity';
import { Schedule } from '../schedule/schedule.entity';
import { Enrollment } from '../enrollment/enrollment.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  description: string;

  // Relación con Professor: Un curso puede tener un profesor asignado (opcional)
  @ManyToOne(() => Professor, professor => professor.courses, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'professorId' }) // Para explicitar la clave foránea
  professor: Professor;

  // Un curso puede tener varios prerrequisitos
  @OneToMany(() => Prerequisite, prerequisite => prerequisite.course)
  prerequisites: Prerequisite[];

  // Un curso puede ser prerrequisito de otros cursos
  @OneToMany(() => Prerequisite, prerequisite => prerequisite.prerequisite)
  requiredBy: Prerequisite[];

  // Un curso puede tener varios horarios asociados
  @OneToMany(() => Schedule, schedule => schedule.course)
  schedules: Schedule[];

  @OneToMany(() => Enrollment, enrollment => enrollment.course)
  enrollments: Enrollment[];
}
