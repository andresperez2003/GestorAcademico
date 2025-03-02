import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { University } from './university.entity';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,
  ) {}

  create(createUniversityDto: CreateUniversityDto) {
    const university = this.universityRepository.create(createUniversityDto);
    return this.universityRepository.save(university);
  }

  findAll() {
    return this.universityRepository.find();
  }

  findOne(id: number) {
    return this.universityRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateUniversityDto: UpdateUniversityDto) {
    await this.universityRepository.update(id, updateUniversityDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.universityRepository.delete(id);
    return { message: 'University deleted successfully' };
  }
}
