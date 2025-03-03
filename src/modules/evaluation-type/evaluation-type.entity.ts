import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EvaluationType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ type: 'float' })
  percentage: number;
}
