// professor.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from './professor.entity';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Department } from '../department/department.entity';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create(createProfessorDto: CreateProfessorDto) {
    const { departmentId, ...professorData } = createProfessorDto;
  
    let department: Department | null = null;
    if (departmentId) {
      const foundDepartment = await this.departmentRepository.findOne({ where: { id: departmentId } });
      if (!foundDepartment) {
        return new NotFoundException(`Department with id ${departmentId} not found`);
      }
      department = foundDepartment;
    }
  
    const professor = this.professorRepository.create({
      ...professorData,
      department: department || undefined,
    });
  
    return await this.professorRepository.save(professor);
  }
  

  findAll() {
    return this.professorRepository.find({ relations: ['department'] });
  }

  findOne(id: string) {
    return this.professorRepository.findOne({ where: { identification:id }, relations: ['department'] });
  }

  async update(id: string, updateProfessorDto: UpdateProfessorDto) {
    const { departmentId, ...professorData } = updateProfessorDto;
  
    let department = undefined;
      const foundDepartment = await this.departmentRepository.findOne({ where: { id: departmentId } });
      if (!foundDepartment) {
      if (!department) {
        throw new NotFoundException(`Department with id ${departmentId} not found`);
      }
    }
  
    await this.professorRepository.update(
      { identification: id },
      { ...professorData, department }
    );
  
    return this.findOne(id);
  }
  
  async remove(id: string) {
    await this.professorRepository.delete({identification:id});
    return { message: 'Professor deleted successfully' };
  }
}