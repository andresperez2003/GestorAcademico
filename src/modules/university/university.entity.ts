import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class University {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({ length: 100 })
  name: string;
}