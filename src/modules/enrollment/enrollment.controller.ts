/**
 * @fileoverview Controlador de Matrículas
 * @description Maneja las rutas HTTP relacionadas con la gestión de matrículas.
 * Todas las rutas están protegidas con autenticación JWT.
 * 
 * @module EnrollmentController
 */

import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { EnrollmentService } from './enrollment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('enrollment')
@UseGuards(JwtAuthGuard) // Protege todas las rutas del controlador con autenticación JWT
export class EnrollmentController {
  /**
   * Constructor del controlador de matrículas
   * @param enrollmentService - Servicio que maneja la lógica de negocio de matrículas
   */
  constructor(private readonly enrollmentService: EnrollmentService) {}

  /**
   * Crea una nueva matrícula
   * @route POST /enrollment
   * @param createEnrollmentDto - Datos de la matrícula a crear
   * @returns La matrícula creada
   * @throws {NotFoundException} Si el curso o estudiante no existen
   * @throws {BadRequestException} Si no se cumplen los prerrequisitos
   */
  @Post()
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentService.create(createEnrollmentDto);
  }

  /**
   * Obtiene todas las matrículas
   * @route GET /enrollment
   * @returns Lista de todas las matrículas con sus relaciones
   */
  @Get()
  findAll() {
    return this.enrollmentService.findAll();
  }

  /**
   * Obtiene una matrícula específica
   * @route GET /enrollment/:id
   * @param id - ID de la matrícula a buscar
   * @returns La matrícula encontrada
   * @throws {NotFoundException} Si la matrícula no existe
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.enrollmentService.findOne(id);
  }

  /**
   * Actualiza una matrícula existente
   * @route PUT /enrollment/:id
   * @param id - ID de la matrícula a actualizar
   * @param updateEnrollmentDto - Datos a actualizar
   * @returns La matrícula actualizada
   * @throws {NotFoundException} Si la matrícula no existe
   * @throws {InternalServerErrorException} Si hay un error en la actualización
   */
  @Put(':id')
  update(@Param('id') id: number, @Body() updateEnrollmentDto: UpdateEnrollmentDto) {
    return this.enrollmentService.update(id, updateEnrollmentDto);
  }
  
  /**
   * Elimina una matrícula
   * @route DELETE /enrollment/:id
   * @param id - ID de la matrícula a eliminar
   * @returns Mensaje de confirmación
   * @throws {NotFoundException} Si la matrícula no existe
   */
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.enrollmentService.remove(id);
  }
}
