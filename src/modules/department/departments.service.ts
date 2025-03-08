import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {

  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    try {
      console.log(createDepartmentDto); // Asegúrate de que universityId está aquí
  
      const university = await this.departmentRepository.findOne({
        where: { id: createDepartmentDto.universityId },
      });
  
      if (!university) {
        throw new NotFoundException('University not found');
      }
  
      const department = this.departmentRepository.create({
        ...createDepartmentDto,
        university, // Aquí asignamos la entidad en lugar del ID
      });
  
      console.log(department);
      
      return await this.departmentRepository.save(department);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error creating department');
    }
  }
  

  async findAll() {
    return await this.departmentRepository.find({ relations: ['university'] });
  }

  async findOne(id: number) {
    const department = await this.departmentRepository.findOne({ where: { id } });
    if (!department) {
        return new NotFoundException(`Department with id ${id} not found`);
    }
    return department;
  }

  async update(id: number, updateUniversityDto: UpdateDepartmentDto) {
    try {
      const department = await this.departmentRepository.findOne({ where: { id } });
      if (!department) {
          return new NotFoundException(`Department with id ${id} not found`);
      }
      await this.departmentRepository.update(id, updateUniversityDto);
      return this.findOne(id);
    } catch (error) {
        return new InternalServerErrorException('Error updating department');
    }
  }
    
  async remove(id: number) {
    const department = await this.departmentRepository.findOne({ where: { id } });
    if (!department) {
        return new NotFoundException(`Department with id ${id} not found`);
    }
    await this.departmentRepository.delete(id);
    return { message: 'Department deleted successfully' };
  }

}
