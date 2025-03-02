import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Controller('departments')
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

}
