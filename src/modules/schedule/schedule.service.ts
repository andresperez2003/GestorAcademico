// schedule.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  create(createScheduleDto: CreateScheduleDto) {
    const schedule = this.scheduleRepository.create(createScheduleDto);
    return this.scheduleRepository.save(schedule);
  }

  findAll() {
    return this.scheduleRepository.find({ relations: ['course'] });
  }

  findOne(id: number) {
    return this.scheduleRepository.findOne({ where: { id }, relations: ['course'] });
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    await this.scheduleRepository.update(id, updateScheduleDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.scheduleRepository.delete(id);
    return { message: 'Schedule deleted successfully' };
  }
}
