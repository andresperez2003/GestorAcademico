import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PrerequisiteService } from './prerequisite.service';
import { CreatePrerequisiteDto } from './dto/create-prerequisite.dto';
import { UpdatePrerequisiteDto } from './dto/update-prerequisite.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // 👈 Importa el guard

@Controller('prerequisites')
@UseGuards(JwtAuthGuard) // 👈 Protege TODAS las rutas del controlador
export class PrerequisiteController {
  constructor(private readonly prerequisiteService: PrerequisiteService) {}

  @Post()
  create(@Body() createPrerequisiteDto: CreatePrerequisiteDto) {
    return this.prerequisiteService.create(createPrerequisiteDto);
  }

  @Get()
  findAll() {
    return this.prerequisiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prerequisiteService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatePrerequisiteDto: UpdatePrerequisiteDto) {
    return this.prerequisiteService.update(id, updatePrerequisiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.prerequisiteService.remove(id);
  }
}
