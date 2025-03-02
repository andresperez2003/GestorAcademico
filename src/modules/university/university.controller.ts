import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UniversityService } from './university.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';

@Controller('universities')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Post()
  create(@Body() createUniversityDto: CreateUniversityDto) {
    return this.universityService.create(createUniversityDto);
  }

  @Get()
  findAll() {
    return this.universityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.universityService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUniversityDto: UpdateUniversityDto) {
    return this.universityService.update(id, updateUniversityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.universityService.remove(id);
  }
}