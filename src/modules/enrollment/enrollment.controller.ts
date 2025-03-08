import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { EnrollmentService } from './enrollment.service';

@Controller('enrollment')
export class EnrollmentController {

  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  create(@Body() creatEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentService.create(creatEnrollmentDto);
  }

  @Get()
  findAll() {
    return this.enrollmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.enrollmentService.findOne(id);
  }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateEnrollmentDto: UpdateEnrollmentDto) {
      return this.enrollmentService.update(id, updateEnrollmentDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.enrollmentService.remove(id);
    }


}
