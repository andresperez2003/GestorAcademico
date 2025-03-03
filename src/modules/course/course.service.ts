// course.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  create(createCourseDto: CreateCourseDto) {
    const course = this.courseRepository.create(createCourseDto);
    return this.courseRepository.save(course);
  }

  findAll() {
    return this.courseRepository.find({ relations: ['professor'] });
  }

  findOne(id: number) {
    return this.courseRepository.findOne({ where: { id }, relations: ['professor'] });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    await this.courseRepository.update(id, updateCourseDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.courseRepository.delete(id);
    return { message: 'Course deleted successfully' };
  }
}