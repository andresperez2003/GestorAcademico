// course.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Professor } from '../professor/professor.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const { professorId, ...courseData } = createCourseDto;
  
    let professor: Professor | null = null;
    if (professorId) {
      professor = await this.professorRepository.findOne({ where: { identification: professorId } });
  
      if (!professor) {
        throw new NotFoundException(`Professor with id ${professorId} not found`);
      }
    }
  
    const course = this.courseRepository.create({
      ...courseData,
      professor: professor || undefined, // Handle the case where professor might be null
    });
  
    return await this.courseRepository.save(course);
  }
  

  async findAll() {
    const courses = await this.courseRepository.find({
      relations: [
        'professor',
        'schedules',
        'prerequisites',
        'prerequisites.prerequisite',
        'requiredBy',
        'requiredBy.course',
        'enrollments',
        'enrollments.student'
      ],
    });
  
    return courses.map(course => ({
      ...course,
      prerequisites: course.prerequisites.map(pr => pr.prerequisite), // Extrae los detalles del curso prerrequisito
    }));
  }

  findOne(id: number) {
    return this.courseRepository.findOne({ where: { id }, relations: [
      'professor',
      'schedules',
      'prerequisites',
      'prerequisites.prerequisite',
      'requiredBy',
      'requiredBy.course',
      'enrollments',
      'enrollments.student',
    ] });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const { professorId, ...courseData } = updateCourseDto;
  
    let professor: Professor | undefined = undefined;
    if (professorId) {
      const foundProfessor = await this.professorRepository.findOne({
        where: { identification: professorId },
      });
  
      if (!foundProfessor) {
        throw new NotFoundException(`Professor with id ${professorId} not found`);
      }
      professor = foundProfessor;
    }
  
    await this.courseRepository.update(id, {
      ...courseData,
      professor, // Se asigna el objeto professor en lugar de professorId
    });
  
    return this.findOne(id); // Retorna el curso actualizado con las relaciones cargadas
  }
  

  async remove(id: number) {
    await this.courseRepository.delete(id);
    return { message: 'Course deleted successfully' };
  }
}