import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { UniversityService } from './university.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // 👈 Importa el guard

@Controller('universities')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @UseGuards(JwtAuthGuard) // 👈 Protege la ruta con el guard
  @Post()
  create(@Body() createUniversityDto: CreateUniversityDto) {
    return this.universityService.create(createUniversityDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    console.log('👤 Usuario autenticado:', req.user); // Verifica que el usuario llegue correctamente
    return this.universityService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.universityService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateUniversityDto: UpdateUniversityDto) {
    return this.universityService.update(id, updateUniversityDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.universityService.remove(id);
  }
}
