/**
 * @fileoverview Servicio de Gestión de Profesores
 * @description Este servicio maneja todas las operaciones relacionadas con los profesores,
 * incluyendo la creación, consulta, actualización y eliminación de registros de profesores.
 * También maneja la generación automática de IDs y las relaciones con departamentos y cursos.
 * 
 * @module ProfessorService
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from './professor.entity';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Department } from '../department/department.entity';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  /**
   * Genera un ID único para un nuevo profesor
   * @returns Promise<string> ID generado en formato 'P001', 'P002', etc.
   * @private
   */
  private async generateProfessorId(): Promise<string> {
    // Obtener todos los IDs de profesores existentes
    const professors = await this.professorRepository.find({
      select: ['identification'],
      order: { identification: 'DESC' },
    });

    if (professors.length === 0) {
      return 'P001'; // Primer profesor
    }

    // Obtener el último ID y generar el siguiente
    const lastId = professors[0].identification;
    const numericPart = parseInt(lastId.substring(1));
    const nextNumericPart = numericPart + 1;
    return `P${nextNumericPart.toString().padStart(3, '0')}`;
  }

  /**
   * Crea un nuevo profesor en el sistema
   * @param createProfessorDto - DTO con los datos del profesor a crear
   * @returns Promise<Professor> El profesor creado
   * @throws NotFoundException si el departamento especificado no existe
   */
  async create(createProfessorDto: CreateProfessorDto) {
    const { departmentId, identification, ...professorData } = createProfessorDto;
  
    let department: Department | null = null;
    if (departmentId) {
      const foundDepartment = await this.departmentRepository.findOne({ where: { id: departmentId } });
      if (!foundDepartment) {
        throw new NotFoundException(`Department with id ${departmentId} not found`);
      }
      department = foundDepartment;
    }

    // Generar ID automáticamente
    const generatedId = await this.generateProfessorId();
  
    const professor = this.professorRepository.create({
      identification: generatedId,
      ...professorData,
      department: department || undefined,
    });
  
    return await this.professorRepository.save(professor);
  }
  

  /**
   * Obtiene todos los profesores con sus relaciones (departamento y cursos)
   * @returns Promise<Professor[]> Lista de profesores con sus relaciones
   */
  findAll() {
    return this.professorRepository.find({ relations: ['department','courses'] });
  }

  /**
   * Busca un profesor por su ID
   * @param id - Identificación del profesor
   * @returns Promise<Professor> El profesor encontrado con sus relaciones
   */
  findOne(id: string) {
    return this.professorRepository.findOne({ where: { identification:id }, relations: ['department','courses'] });
  }

  /**
   * Actualiza los datos de un profesor existente
   * @param id - Identificación del profesor a actualizar
   * @param updateProfessorDto - DTO con los datos a actualizar
   * @returns Promise<Professor> El profesor actualizado
   * @throws NotFoundException si el profesor o el departamento no existen
   */
  async update(id: string, updateProfessorDto: UpdateProfessorDto) {
    const { departmentId, ...professorData } = updateProfessorDto;
  
    // Buscar el profesor existente con relaciones
    const professor = await this.professorRepository.findOne({
      where: { identification: id },
      relations: ['department', 'courses'],
    });
  
    if (!professor) {
      throw new NotFoundException(`Professor with ID ${id} not found`);
    }
  
    // Manejar la relación con Department
    if (departmentId) {
      const foundDepartment = await this.departmentRepository.findOne({
        where: { id: departmentId },
      });
  
      if (!foundDepartment) {
        throw new NotFoundException(`Department with ID ${departmentId} not found`);
      }
  
      professor.department = foundDepartment;
    }
  
    // Manejar datos del profesor (sin courses)
    Object.assign(professor, professorData);
  
    // Guardar cambios
    return await this.professorRepository.save(professor);
  }
  
  
  /**
   * Elimina un profesor del sistema
   * @param id - Identificación del profesor a eliminar
   * @returns Promise<{message: string}> Mensaje de confirmación
   */
  async remove(id: string) {
    await this.professorRepository.delete({identification:id});
    return { message: 'Professor deleted successfully' };
  }
}