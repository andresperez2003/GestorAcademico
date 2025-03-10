import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // 👈 Importa el guard

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @UseGuards(JwtAuthGuard) // 👈 Protege esta ruta
  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  @UseGuards(JwtAuthGuard) // 👈 Protege esta ruta
  @Get()
  findAll() {
    return this.scheduleService.findAll();
  }

  @UseGuards(JwtAuthGuard) // 👈 Protege esta ruta
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.scheduleService.findOne(id);
  }

  @UseGuards(JwtAuthGuard) // 👈 Protege esta ruta
  @Put(':id')
  update(@Param('id') id: number, @Body() updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @UseGuards(JwtAuthGuard) // 👈 Protege esta ruta
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.scheduleService.remove(id);
  }
}
