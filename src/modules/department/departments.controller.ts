/**
 * @fileoverview Controlador de Gestión de Departamentos
 * @description Este controlador maneja todas las rutas HTTP relacionadas con la gestión de departamentos.
 * Todas las rutas están protegidas con autenticación JWT para garantizar la seguridad.
 * 
 * @module DepartmentsController
 */

import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('departments')
@UseGuards(JwtAuthGuard) // Protege todas las rutas del controlador
export class DepartmentsController {

  constructor(private readonly departmentService: DepartmentsService) {}

  /**
   * Crea un nuevo departamento
   * @route POST /departments
   * @param createDepartmentDto - Datos del departamento a crear
   * @returns Promise<Department> El departamento creado
   * @protected Requiere autenticación JWT
   */
  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  /**
   * Obtiene todos los departamentos
   * @route GET /departments
   * @returns Promise<Department[]> Lista de departamentos con sus relaciones
   * @protected Requiere autenticación JWT
   */
  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  /**
   * Obtiene un departamento por su ID
   * @route GET /departments/:id
   * @param id - Identificador del departamento
   * @returns Promise<Department> El departamento encontrado
   * @protected Requiere autenticación JWT
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.departmentService.findOne(id);
  }

  /**
   * Actualiza los datos de un departamento
   * @route PUT /departments/:id
   * @param id - Identificador del departamento a actualizar
   * @param updateDepartmentDto - Datos a actualizar
   * @returns Promise<Department> El departamento actualizado
   * @protected Requiere autenticación JWT
   */
  @Put(':id')
  update(@Param('id') id: number, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentService.update(id, updateDepartmentDto);
  }

  /**
   * Elimina un departamento
   * @route DELETE /departments/:id
   * @param id - Identificador del departamento a eliminar
   * @returns Promise<{message: string}> Mensaje de confirmación
   * @protected Requiere autenticación JWT
   */
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.departmentService.remove(id);
  }

}
