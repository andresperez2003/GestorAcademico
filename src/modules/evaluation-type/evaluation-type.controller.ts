import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { EvaluationTypeService } from './evaluation-type.service';
import { CreateEvaluationTypeDto } from './dto/create-evaluation-type.dto';
import { UpdateEvaluationTypeDto } from './dto/update-evaluation-type.dto';

@Controller('evaluation-type')
export class EvaluationTypeController {

    constructor(private readonly evaluationTypeService: EvaluationTypeService) {}

    @Post()
    create(@Body() createEvaluationTypeDto: CreateEvaluationTypeDto) {
        let createEvaluationTypeDto2 = createEvaluationTypeDto["body"];
        console.log(createEvaluationTypeDto2);
    return this.evaluationTypeService.create(createEvaluationTypeDto2);
    }

    @Get()
    findAll() {
    return this.evaluationTypeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
    const evaluationType = this.evaluationTypeService.findOne(id);
    if (!evaluationType) {
        return new NotFoundException(`Evaluation type with id ${id} not foun`);
    }
    return evaluationType;
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateEvaluationTypeDto: UpdateEvaluationTypeDto) {
        const evaluationType = this.evaluationTypeService.findOne(id);
        if (!evaluationType) {
            return new NotFoundException(`Evaluation type with id ${id} not foun`);
        }
        return this.evaluationTypeService.update(id, updateEvaluationTypeDto);
    }
    
    @Delete(':id')
    remove(@Param('id') id: number) {
        const evaluationType = this.evaluationTypeService.findOne(id);
        if (!evaluationType) {
            return new NotFoundException(`Evaluation type with id ${id} not foun`);
        }
        return this.evaluationTypeService.remove(id);
    }

}
