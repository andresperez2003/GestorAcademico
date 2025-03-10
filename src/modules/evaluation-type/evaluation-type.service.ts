import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EvaluationType } from './evaluation-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEvaluationTypeDto } from './dto/create-evaluation-type.dto';
import { UpdateEvaluationTypeDto } from './dto/update-evaluation-type.dto';

@Injectable()
export class EvaluationTypeService {
    constructor(
    @InjectRepository(EvaluationType)
        private readonly evaluationTypeRespository: Repository<EvaluationType>,
    ) {}
    
    async create(createEvaluationTypeDto: CreateEvaluationTypeDto) {
        try {
            console.log(createEvaluationTypeDto);
            const evaluationType = this.evaluationTypeRespository.create(createEvaluationTypeDto);
            return await this.evaluationTypeRespository.save(evaluationType);
        } catch (error) {
            return new InternalServerErrorException('Error creating evaluation type');
        }
    }
    
    async findAll() {
        return await this.evaluationTypeRespository.find();
    }
    
    async findOne(id: number) {
        const evaluationType = await this.evaluationTypeRespository.findOne({ where: { id } });
        if (!evaluationType) {
            throw new NotFoundException(`Evaluation type with id ${id} not found`);
        }
        return evaluationType; 
    }
    
    async update(id: number, updateEvaluationTypeDto: UpdateEvaluationTypeDto) {
        try {
            const evaluationType = await this.evaluationTypeRespository.findOne({ where: { id } });
            if (!evaluationType) {
                return new NotFoundException(`Evaluation type with id ${id} not found`);
            }
            await this.evaluationTypeRespository.update(id, updateEvaluationTypeDto);
            return this.findOne(id);
        } catch (error) {
            return new InternalServerErrorException('Error updating evaluation type');
        }
    }
      
    async remove(id: number) {
        const evaluationType = await this.evaluationTypeRespository.findOne({ where: { id } });
        if (!evaluationType) {
            throw new NotFoundException(`Evaluation type with id ${id} not found`);
        }
        await this.evaluationTypeRespository.delete(id);
        return { message: 'Evaluation type deleted successfully' };
    }

}
