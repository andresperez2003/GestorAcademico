import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Evaluation } from '../evaluation/evaluation.entity';

@Entity('EvaluationType')
export class EvaluationType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @OneToMany(() => Evaluation, evaluation => evaluation.evaluationType)
  evaluations: Evaluation[];
}
