/**
 * @fileoverview Controlador de Gestión de Profesores
 * @description Este controlador maneja todas las rutas HTTP relacionadas con la gestión de profesores.
 * Todas las rutas están protegidas con autenticación JWT para garantizar la seguridad.
 * 
 * @module ProfessorController
 */

import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // 👈 Importa el guard

@Controller('professors')
@UseGuards(JwtAuthGuard) // 👈 Protege TODAS las rutas del controlador
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  /**
   * Crea un nuevo profesor
   * @route POST /professors
   * @param createProfessorDto - Datos del profesor a crear
   * @returns Promise<Professor> El profesor creado
   * @protected Requiere autenticación JWT
   */
  @Post()
  create(@Body() createProfessorDto: CreateProfessorDto) {
    return this.professorService.create(createProfessorDto);
  }

  /**
   * Obtiene todos los profesores
   * @route GET /professors
   * @returns Promise<Professor[]> Lista de profesores con sus relaciones
   * @protected Requiere autenticación JWT
   */
  @Get()
  findAll() {
    return this.professorService.findAll();
  }

  /**
   * Obtiene un profesor por su ID
   * @route GET /professors/:id
   * @param id - Identificación del profesor
   * @returns Promise<Professor> El profesor encontrado con sus relaciones
   * @protected Requiere autenticación JWT
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professorService.findOne(id);
  }

  /**
   * Actualiza los datos de un profesor
   * @route PUT /professors/:id
   * @param id - Identificación del profesor a actualizar
   * @param updateProfessorDto - Datos a actualizar
   * @returns Promise<Professor> El profesor actualizado
   * @protected Requiere autenticación JWT
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProfessorDto: UpdateProfessorDto) {
    return this.professorService.update(id, updateProfessorDto);
  }

  /**
   * Elimina un profesor
   * @route DELETE /professors/:id
   * @param id - Identificación del profesor a eliminar
   * @returns Promise<{message: string}> Mensaje de confirmación
   * @protected Requiere autenticación JWT
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professorService.remove(id);
  }
}