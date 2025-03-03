import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Evaluation } from '../evaluation/evaluation.entity';

@Entity()
export class EvaluationType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ type: 'float' })
  percentage: number;

  @OneToMany(() => Evaluation, evaluation => evaluation.evaluationType)
  evaluations: Evaluation[];

}
