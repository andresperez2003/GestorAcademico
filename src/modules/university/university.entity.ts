import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('university')
export class University {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column({ length: 50, unique: true })
  nombre: string;


/*   @OneToMany(() => Departamento, (departamento) => departamento.universidad)
  departamentos: Departamento[]; */
}