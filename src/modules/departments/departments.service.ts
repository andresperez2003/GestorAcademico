import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentsService {

  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    const university = this.departmentRepository.create(createDepartmentDto);
    return await this.departmentRepository.save(university);
  }

  async findAll() {
    return await this.departmentRepository.find();
  }

  async findOne(id: number) {
    return await this.departmentRepository.findOne({ where: { id } });
  }


}
