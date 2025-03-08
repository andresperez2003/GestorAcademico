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

    async create(createStudentDto: CreateStudentDto) {
        try {
            const student = this.studentRepository.create(createStudentDto);
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
