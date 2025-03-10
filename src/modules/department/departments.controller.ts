import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('departments')
@UseGuards(JwtAuthGuard) // 👈 Protege TODAS las rutas del controlador
export class DepartmentsController {

  constructor(private readonly departmentService: DepartmentsService) {}

  @Post()
  create(@Body() createDeparmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDeparmentDto);
  }

  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.departmentService.findOne(id);
  }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateUniversityDto: UpdateDepartmentDto) {
      return this.departmentService.update(id, updateUniversityDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.departmentService.remove(id);
    }

}
