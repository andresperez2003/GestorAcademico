import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('evaluation')
@UseGuards(JwtAuthGuard) // 👈 Protege TODAS las rutas del controlador
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  create(@Body() createEvaluationDto: CreateEvaluationDto) {
    return this.evaluationService.create(createEvaluationDto);
  }

  @Get()
  findAll() {
    return this.evaluationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.evaluationService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateEvaluationDto: UpdateEvaluationDto) {
    return this.evaluationService.update(id, updateEvaluationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.evaluationService.remove(id);
  }
}
