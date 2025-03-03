// course.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Professor } from '../professor/professor.entity';
import { Prerequisite } from '../prerequisite/prerequisite.entity';
import { Schedule } from '../schedule/schedule.entity';

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

  // Relación con Prerequisite: un curso puede tener varios prerequisitos
  @OneToMany(() => Prerequisite, prerequisite => prerequisite.course)
  prerequisites: Prerequisite[];

  // Relación inversa: un curso puede ser prerequisito de otros cursos
  @OneToMany(() => Prerequisite, prerequisite => prerequisite.prerequisite)
  requiredBy: Prerequisite[];

  // Relación con Schedule: un curso puede tener varios horarios
  @OneToMany(() => Schedule, schedule => schedule.course)
  schedules: Schedule[];

}
