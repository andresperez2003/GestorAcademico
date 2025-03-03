import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryColumn({ length: 20 })
  identification: string;

  @Column({ length: 30 })
  firstName: string;

  @Column({ length: 30 })
  lastName: string;

  @Column({ type: 'date' })
  birthDate: Date;
}
