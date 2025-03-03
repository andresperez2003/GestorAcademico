// schedule.service.ts
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Course } from '../course/course.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto) {
    try {
      const { courseId, ...scheduleData } = createScheduleDto;
  
      // Buscar el curso en la base de datos
      const course = await this.courseRepository.findOne({ where: { id: courseId } });
      if (!course) {
        throw new NotFoundException(`Course with id ${courseId} not found`);
      }
  
      // Crear el horario con el objeto de curso correcto
      const schedule = this.scheduleRepository.create({
        ...scheduleData,
        course, // Asignamos el objeto completo
      });
  
      return await this.scheduleRepository.save(schedule);
    } catch (error) {
      throw new InternalServerErrorException('Error creating schedule');
    }
  }
  

  findAll() {
    return this.scheduleRepository.find({ relations: ['course'] });
  }

  findOne(id: number) {
    return this.scheduleRepository.findOne({ where: { id }, relations: ['course'] });
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    const { courseId, ...scheduleData } = updateScheduleDto;
  
    let course: Course | null | undefined = undefined;
    if (courseId) {
      course = await this.courseRepository.findOne({ where: { id: courseId } });
      if (!course) {
        throw new NotFoundException(`Course with id ${courseId} not found`);
      }
    }
  
    await this.scheduleRepository.update(id, { ...scheduleData, course });
  
    return this.findOne(id);
  }
  

  async remove(id: number) {
    await this.scheduleRepository.delete(id);
    return { message: 'Schedule deleted successfully' };
  }
}
