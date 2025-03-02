import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class University {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column({ length: 50 })
  name: string;
}
