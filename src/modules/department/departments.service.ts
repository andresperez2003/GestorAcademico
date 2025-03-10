/**
 * @fileoverview Servicio de Gestión de Departamentos
 * @description Este servicio maneja todas las operaciones relacionadas con los departamentos,
 * incluyendo la creación, consulta, actualización y eliminación de departamentos.
 * También maneja las relaciones con universidades y profesores.
 * 
 * @module DepartmentsService
 */

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {

  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  /**
   * Crea un nuevo departamento en el sistema
   * @param createDepartmentDto - DTO con los datos del departamento a crear
   * @returns Promise<Department> El departamento creado
   * @throws NotFoundException si la universidad especificada no existe
   * @throws InternalServerErrorException si hay un error al crear el departamento
   */
  async create(createDepartmentDto: CreateDepartmentDto) {
    try {
      console.log(createDepartmentDto); // Asegúrate de que universityId está aquí
  
      const university = await this.departmentRepository.findOne({
        where: { id: createDepartmentDto.universityId },
      });
  
      if (!university) {
        throw new NotFoundException('University not found');
      }
  
      const department = this.departmentRepository.create({
        ...createDepartmentDto,
        university, // Aquí asignamos la entidad en lugar del ID
      });
  
      console.log(department);
      
      return await this.departmentRepository.save(department);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error creating department');
    }
  }
  

  /**
   * Obtiene todos los departamentos con sus relaciones
   * @returns Promise<Department[]> Lista de departamentos con sus universidades
   */
  async findAll() {
    return await this.departmentRepository.find({ relations: ['university'] });
  }

  /**
   * Busca un departamento por su ID
   * @param id - Identificador del departamento
   * @returns Promise<Department> El departamento encontrado
   * @throws NotFoundException si el departamento no existe
   */
  async findOne(id: number) {
    const department = await this.departmentRepository.findOne({ where: { id } });
    if (!department) {
        return new NotFoundException(`Department with id ${id} not found`);
    }
    return department;
  }

  /**
   * Actualiza los datos de un departamento existente
   * @param id - Identificador del departamento a actualizar
   * @param updateDepartmentDto - DTO con los datos a actualizar
   * @returns Promise<Department> El departamento actualizado
   * @throws NotFoundException si el departamento no existe
   * @throws InternalServerErrorException si hay un error al actualizar
   */
  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    try {
      const department = await this.departmentRepository.findOne({ where: { id } });
      if (!department) {
          return new NotFoundException(`Department with id ${id} not found`);
      }
      await this.departmentRepository.update(id, updateDepartmentDto);
      return this.findOne(id);
    } catch (error) {
        return new InternalServerErrorException('Error updating department');
    }
  }
    
  /**
   * Elimina un departamento del sistema
   * @param id - Identificador del departamento a eliminar
   * @returns Promise<{message: string}> Mensaje de confirmación
   * @throws NotFoundException si el departamento no existe
   */
  async remove(id: number) {
    const department = await this.departmentRepository.findOne({ where: { id } });
    if (!department) {
        return new NotFoundException(`Department with id ${id} not found`);
    }
    await this.departmentRepository.delete(id);
    return { message: 'Department deleted successfully' };
  }

}
