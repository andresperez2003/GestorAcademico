import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './students.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

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
            return new InternalServerErrorException('Error creating student');
        }
    }
    
    async findAll() {
        return await this.studentRepository.find();
    }
    
    async findOne(id: string) {
        const student = await this.studentRepository.findOne({ where: { identification:id } });
        if (!student) {
            return new NotFoundException(`Student with id ${id} not found`);
        }
        return student; 
    }
    
    async update(id: string, updateStudentDto: UpdateStudentDto) {
        try {
            const student = await this.studentRepository.findOne({ where: { identification:id } });
            if (!student) {
                return new NotFoundException(`Student with id ${id} not found`);
            }
            await this.studentRepository.update(id, updateStudentDto);
            return this.findOne(id);
        } catch (error) {
            return new InternalServerErrorException('Error updating student');
        }
    }
      
    async remove(id: string) {
        const student = await this.studentRepository.findOne({ where: { identification:id } });
        if (!student) {
            return new NotFoundException(`Student with id ${id} not found`);
        }
          await this.studentRepository.delete(id);
          return { message: 'Department deleted successfully' };
    }
}
