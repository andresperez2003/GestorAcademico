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
    return this.professorRepository.find({ relations: ['department','courses'] });
  }

  findOne(id: string) {
    return this.professorRepository.findOne({ where: { identification:id }, relations: ['department','courses'] });
  }

  async update(id: string, updateProfessorDto: UpdateProfessorDto) {
    const { departmentId, ...professorData } = updateProfessorDto;
  
    // Buscar el profesor existente con relaciones
    const professor = await this.professorRepository.findOne({
      where: { identification: id },
      relations: ['department', 'courses'],
    });
  
    if (!professor) {
      throw new NotFoundException(`Professor with ID ${id} not found`);
    }
  
    // Manejar la relación con Department
    if (departmentId) {
      const foundDepartment = await this.departmentRepository.findOne({
        where: { id: departmentId },
      });
  
      if (!foundDepartment) {
        throw new NotFoundException(`Department with ID ${departmentId} not found`);
      }
  
      professor.department = foundDepartment;
    }
  
    // Manejar datos del profesor (sin courses)
    Object.assign(professor, professorData);
  
    // Guardar cambios
    return await this.professorRepository.save(professor);
  }
  
  
  async remove(id: string) {
    await this.professorRepository.delete({identification:id});
    return { message: 'Professor deleted successfully' };
  }
}