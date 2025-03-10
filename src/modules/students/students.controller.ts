/**
 * @fileoverview Controlador de Gestión de Estudiantes
 * @description Este controlador maneja todas las rutas HTTP relacionadas con la gestión de estudiantes.
 * Todas las rutas están protegidas con autenticación JWT para garantizar la seguridad.
 * 
 * @module StudentsController
 */

import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // 👈 Importa el guard

@Controller('students')
export class StudentsController {

    constructor(private readonly studentService: StudentsService) {}

    /**
     * Crea un nuevo estudiante
     * @route POST /students
     * @param createStudentDto - Datos del estudiante a crear
     * @returns Promise<Student> El estudiante creado
     * @protected Requiere autenticación JWT
     */
    @UseGuards(JwtAuthGuard) // 👈 Protege esta ruta
    @Post()
    create(@Body() createStudentDto: CreateStudentDto) {
        return this.studentService.create(createStudentDto);
    }

    /**
     * Obtiene todos los estudiantes
     * @route GET /students
     * @returns Promise<Student[]> Lista de estudiantes
     * @protected Requiere autenticación JWT
     */
    @UseGuards(JwtAuthGuard) // 👈 Protege esta ruta
    @Get()
    findAll() {
        return this.studentService.findAll();
    }

    /**
     * Obtiene un estudiante por su ID
     * @route GET /students/:id
     * @param id - Identificación del estudiante
     * @returns Promise<Student> El estudiante encontrado
     * @throws NotFoundException si el estudiante no existe
     * @protected Requiere autenticación JWT
     */
    @UseGuards(JwtAuthGuard) // 👈 Protege esta ruta
    @Get(':id')
    findOne(@Param('id') id: string) {
        const student = this.studentService.findOne(id);
        if (!student) {
            throw new NotFoundException(`Student with id ${id} not found`);
        }
        return student;
    }

    /**
     * Actualiza los datos de un estudiante
     * @route PUT /students/:id
     * @param id - Identificación del estudiante a actualizar
     * @param updateStudentDto - Datos a actualizar
     * @returns Promise<Student> El estudiante actualizado
     * @throws NotFoundException si el estudiante no existe
     * @protected Requiere autenticación JWT
     */
    @UseGuards(JwtAuthGuard) // 👈 Protege esta ruta
    @Put(':id')
    update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
        const student = this.studentService.findOne(id);
        if (!student) {
            throw new NotFoundException(`Student with id ${id} not found`);
        }
        return this.studentService.update(id, updateStudentDto);
    }

    /**
     * Elimina un estudiante
     * @route DELETE /students/:id
     * @param id - Identificación del estudiante a eliminar
     * @returns Promise<{message: string}> Mensaje de confirmación
     * @throws NotFoundException si el estudiante no existe
     * @protected Requiere autenticación JWT
     */
    @UseGuards(JwtAuthGuard) // 👈 Protege esta ruta
    @Delete(':id')
    remove(@Param('id') id: string) {
        const student = this.studentService.findOne(id);
        if (!student) {
            throw new NotFoundException(`Student with id ${id} not found`);
        }
        return this.studentService.remove(id);
    }
}
