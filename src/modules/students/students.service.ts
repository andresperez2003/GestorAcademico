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

    async findAll() {
        return await this.studentRepository.find({
            relations: ['enrollments', 'enrollments.evaluations', 'enrollments.course'],
        });
    }

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

    async remove(id: string) {
        const student = await this.studentRepository.findOne({ where: { identification: id } });

        if (!student) {
            throw new NotFoundException(`Student with id ${id} not found`);
        }

        await this.studentRepository.delete(id);
        return { message: 'Student deleted successfully' };
    }
}
