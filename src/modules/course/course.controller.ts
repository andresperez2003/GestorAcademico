/**
 * @fileoverview Controlador de Gestión de Cursos
 * @description Este controlador maneja todas las rutas HTTP relacionadas con la gestión de cursos.
 * Todas las rutas están protegidas con autenticación JWT para garantizar la seguridad.
 * 
 * @module CourseController
 */

// course.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 

@Controller('courses')
@UseGuards(JwtAuthGuard) // Protege todas las rutas del controlador
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  /**
   * Crea un nuevo curso
   * @route POST /courses
   * @param createCourseDto - Datos del curso a crear
   * @returns Promise<Course> El curso creado
   * @protected Requiere autenticación JWT
   */
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  /**
   * Obtiene todos los cursos
   * @route GET /courses
   * @returns Promise<Course[]> Lista de cursos con todas sus relaciones
   * @protected Requiere autenticación JWT
   */
  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  /**
   * Obtiene un curso por su ID
   * @route GET /courses/:id
   * @param id - Identificador del curso
   * @returns Promise<Course> El curso encontrado con sus relaciones
   * @protected Requiere autenticación JWT
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.courseService.findOne(id);
  }

  /**
   * Actualiza los datos de un curso
   * @route PUT /courses/:id
   * @param id - Identificador del curso a actualizar
   * @param updateCourseDto - Datos a actualizar
   * @returns Promise<Course> El curso actualizado
   * @protected Requiere autenticación JWT
   */
  @Put(':id')
  update(@Param('id') id: number, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  /**
   * Elimina un curso
   * @route DELETE /courses/:id
   * @param id - Identificador del curso a eliminar
   * @returns Promise<{message: string}> Mensaje de confirmación
   * @protected Requiere autenticación JWT
   */
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.courseService.remove(id);
  }
}