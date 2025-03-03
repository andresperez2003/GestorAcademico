import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prerequisite } from './prerequisite.entity';
import { CreatePrerequisiteDto } from './dto/create-prerequisite.dto';
import { UpdatePrerequisiteDto } from './dto/update-prerequisite.dto';
import { Course } from '../course/course.entity';

@Injectable()
export class PrerequisiteService {
  constructor(
    @InjectRepository(Prerequisite)
    private readonly prerequisiteRepository: Repository<Prerequisite>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createPrerequisiteDto: CreatePrerequisiteDto) {
    const { courseId, prerequisiteId } = createPrerequisiteDto;

    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    if (!course) throw new NotFoundException(`Course with ID ${courseId} not found`);

    const prerequisite = await this.courseRepository.findOne({ where: { id: prerequisiteId } });
    if (!prerequisite) throw new NotFoundException(`Prerequisite Course with ID ${prerequisiteId} not found`);

    const newPrerequisite = this.prerequisiteRepository.create({ course, prerequisite });
    return this.prerequisiteRepository.save(newPrerequisite);
  }

  findAll() {
    return this.prerequisiteRepository.find({ relations: ['course', 'prerequisite'] });
  }

  findOne(id: number) {
    return this.prerequisiteRepository.findOne({ where: { id }, relations: ['course', 'prerequisite'] });
  }

  async update(id: number, updatePrerequisiteDto: UpdatePrerequisiteDto) {
    const prerequisite = await this.prerequisiteRepository.findOne({ where: { id } });
    if (!prerequisite) throw new NotFoundException(`Prerequisite with ID ${id} not found`);

    if (updatePrerequisiteDto.courseId) {
      const course = await this.courseRepository.findOne({ where: { id: updatePrerequisiteDto.courseId } });
      if (!course) throw new NotFoundException(`Course with ID ${updatePrerequisiteDto.courseId} not found`);
      prerequisite.course = course;
    }

    if (updatePrerequisiteDto.prerequisiteId) {
      const prerequisiteCourse = await this.courseRepository.findOne({ where: { id: updatePrerequisiteDto.prerequisiteId } });
      if (!prerequisiteCourse) throw new NotFoundException(`Prerequisite Course with ID ${updatePrerequisiteDto.prerequisiteId} not found`);
      prerequisite.prerequisite = prerequisiteCourse;
    }

    return this.prerequisiteRepository.save(prerequisite);
  }

  async remove(id: number) {
    const prerequisite = await this.prerequisiteRepository.findOne({ where: { id } });
    if (!prerequisite) throw new NotFoundException(`Prerequisite with ID ${id} not found`);

    await this.prerequisiteRepository.delete(id);
    return { message: 'Prerequisite deleted successfully' };
  }
}
