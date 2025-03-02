import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { University } from './university.entity';
import { CreateUniversityDto } from './dto/create-university.dto';

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,
  ) {}

  async create(createUniversityDto: CreateUniversityDto) {
    const university = this.universityRepository.create(createUniversityDto);
    return await this.universityRepository.save(university);
  }

  async findAll() {
    return await this.universityRepository.find();
  }

  async findOne(id: number) {
    return await this.universityRepository.findOne({ where: { id } });
  }
}
