/**
 * @fileoverview Servicio de Gestión de Estudiantes
 * @description Este servicio maneja todas las operaciones relacionadas con los estudiantes,
 * incluyendo la creación, consulta, actualización y eliminación de registros de estudiantes.
 * También maneja la generación automática de IDs y las relaciones con matrículas.
 * 
 * @module StudentsService
 */

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from '../enrollment/enrollment.entity';
import { CreateStudentDto } from '../students/dto/create-student.dto';
import { Student } from '../students/students.entity';
import { UpdateStudentDto } from '../students/dto/update-student.dto';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
    ) {}

    /**
     * Genera un ID único para un nuevo estudiante
     * @returns Promise<string> ID generado en formato 'S001', 'S002', etc.
     * @private
     */
    private async generateStudentId(): Promise<string> {
        // Obtener todos los IDs de estudiantes existentes
        const students = await this.studentRepository.find({
            select: ['identification'],
            order: { identification: 'DESC' },
        });

        if (students.length === 0) {
            return 'S001'; // Primer estudiante
        }

        // Obtener el último ID y generar el siguiente
        const lastId = students[0].identification;
        const numericPart = parseInt(lastId.substring(1));
        const nextNumericPart = numericPart + 1;
        return `S${nextNumericPart.toString().padStart(3, '0')}`;
    }

    /**
     * Crea un nuevo estudiante en el sistema
     * @param createStudentDto - DTO con los datos del estudiante a crear
     * @returns Promise<Student> El estudiante creado
     * @throws InternalServerErrorException si hay un error al crear el estudiante
     */
    async create(createStudentDto: CreateStudentDto) {
        try {
            const { identification, ...studentData } = createStudentDto;
            
            // Generar ID automáticamente
            const generatedId = await this.generateStudentId();
            
            const student = this.studentRepository.create({
                identification: generatedId,
                ...studentData
            });
            
            return await this.studentRepository.save(student);
        } catch (error) {
            throw new InternalServerErrorException('Error creating student');
        }
    }

    /**
     * Obtiene todos los estudiantes con sus matrículas y evaluaciones relacionadas
     * @returns Promise<Student[]> Lista de estudiantes con sus relaciones
     */
    async findAll() {
        return await this.studentRepository.find({
            relations: ['enrollments', 'enrollments.evaluations', 'enrollments.course'],
        });
    }

    /**
     * Busca un estudiante por su ID
     * @param id - Identificación del estudiante
     * @returns Promise<Student> El estudiante encontrado
     * @throws NotFoundException si el estudiante no existe
     */
    async findOne(id: string) {
        const student = await this.studentRepository.findOne({
            where: { identification: id },
            relations: ['enrollments', 'enrollments.evaluations'],
        });

        if (!student) {
            throw new NotFoundException(`Student with id ${id} not found`);
        }

        return student;
    }

    /**
     * Actualiza los datos de un estudiante existente
     * @param id - Identificación del estudiante a actualizar
     * @param updateStudentDto - DTO con los datos a actualizar
     * @returns Promise<Student> El estudiante actualizado
     * @throws NotFoundException si el estudiante no existe
     * @throws InternalServerErrorException si hay un error al actualizar
     */
    async update(id: string, updateStudentDto: UpdateStudentDto) {
        try {
            const student = await this.studentRepository.findOne({ where: { identification: id } });

            if (!student) {
                throw new NotFoundException(`Student with id ${id} not found`);
            }

            await this.studentRepository.update(id, updateStudentDto);
            return this.findOne(id);
        } catch (error) {
            throw new InternalServerErrorException('Error updating student');
        }
    }

    /**
     * Elimina un estudiante del sistema
     * @param id - Identificación del estudiante a eliminar
     * @returns Promise<{message: string}> Mensaje de confirmación
     * @throws NotFoundException si el estudiante no existe
     */
    async remove(id: string) {
        const student = await this.studentRepository.findOne({ where: { identification: id } });

        if (!student) {
            throw new NotFoundException(`Student with id ${id} not found`);
        }

        await this.studentRepository.delete(id);
        return { message: 'Student deleted successfully' };
    }
}
