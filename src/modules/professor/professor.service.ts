// professor.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from './professor.entity';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
  ) {}

  create(createProfessorDto: CreateProfessorDto) {
    const professor = this.professorRepository.create(createProfessorDto);
    return this.professorRepository.save(professor);
  }

  findAll() {
    return this.professorRepository.find({ relations: ['department'] });
  }

  findOne(id: string) {
    return this.professorRepository.findOne({ where: { identification:id }, relations: ['department'] });
  }

  async update(id: string, updateProfessorDto: UpdateProfessorDto) {
    await this.professorRepository.update({identification:id}, updateProfessorDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.professorRepository.delete({identification:id});
    return { message: 'Professor deleted successfully' };
  }
}