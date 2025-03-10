/**
 * @fileoverview Controlador de Evaluaciones
 * @description Maneja las rutas HTTP relacionadas con la gestión de evaluaciones.
 * Todas las rutas están protegidas con autenticación JWT.
 * 
 * @module EvaluationController
 */

import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('evaluation')
@UseGuards(JwtAuthGuard) // Protege todas las rutas del controlador con autenticación JWT
export class EvaluationController {
  /**
   * Constructor del controlador de evaluaciones
   * @param evaluationService - Servicio que maneja la lógica de negocio de evaluaciones
   */
  constructor(private readonly evaluationService: EvaluationService) {}

  /**
   * Crea una nueva evaluación
   * @route POST /evaluation
   * @param createEvaluationDto - Datos de la evaluación a crear
   * @returns La evaluación creada
   * @throws {NotFoundException} Si la matrícula o el tipo de evaluación no existen
   * @throws {InternalServerErrorException} Si hay un error durante la creación
   */
  @Post()
  create(@Body() createEvaluationDto: CreateEvaluationDto) {
    return this.evaluationService.create(createEvaluationDto);
  }

  /**
   * Obtiene todas las evaluaciones
   * @route GET /evaluation
   * @returns Lista de todas las evaluaciones con sus relaciones
   */
  @Get()
  findAll() {
    return this.evaluationService.findAll();
  }

  /**
   * Obtiene una evaluación específica
   * @route GET /evaluation/:id
   * @param id - ID de la evaluación a buscar
   * @returns La evaluación encontrada
   * @throws {NotFoundException} Si la evaluación no existe
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.evaluationService.findOne(id);
  }

  /**
   * Actualiza una evaluación existente
   * @route PUT /evaluation/:id
   * @param id - ID de la evaluación a actualizar
   * @param updateEvaluationDto - Datos a actualizar
   * @returns La evaluación actualizada
   * @throws {NotFoundException} Si la evaluación no existe
   * @throws {InternalServerErrorException} Si hay un error en la actualización
   */
  @Put(':id')
  update(@Param('id') id: number, @Body() updateEvaluationDto: UpdateEvaluationDto) {
    return this.evaluationService.update(id, updateEvaluationDto);
  }

  /**
   * Elimina una evaluación
   * @route DELETE /evaluation/:id
   * @param id - ID de la evaluación a eliminar
   * @returns Mensaje de confirmación
   * @throws {NotFoundException} Si la evaluación no existe
   */
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.evaluationService.remove(id);
  }
}
