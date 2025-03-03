import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Enrollment } from '../enrollment/enrollment.entity';
import { EvaluationType } from '../evaluation-type/evaluation-type.entity';

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  evaluationDate: Date;

  @Column({ type: 'float' })
  grade: number;

  @ManyToOne(() => Enrollment, enrollment => enrollment.evaluations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'enrollmentId' })
  enrollment: Enrollment;

  @ManyToOne(() => EvaluationType, evaluationType => evaluationType.evaluations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'evaluationTypeId' })
  evaluationType: EvaluationType;
}
