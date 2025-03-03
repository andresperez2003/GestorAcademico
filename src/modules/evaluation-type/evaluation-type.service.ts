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
            const student = this.evaluationTypeRespository.create(createEvaluationTypeDto);
            return await this.evaluationTypeRespository.save(student);
        } catch (error) {
            return new InternalServerErrorException('Error creating evaluation type');
        }
    }
    
    async findAll() {
        return await this.evaluationTypeRespository.find();
    }
    
    async findOne(id: number) {
        const evluationType = await this.evaluationTypeRespository.findOne({ where: { id } });
        if (!evluationType) {
            return new NotFoundException(`Evaluation type with id ${id} not found`);
        }
        return evluationType; 
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
        const student = await this.evaluationTypeRespository.findOne({ where: { id } });
        if (!student) {
            return new NotFoundException(`Evaluation type with id ${id} not found`);
        }
          await this.evaluationTypeRespository.delete(id);
          return { message: 'Evaluation type deleted successfully' };
    }

}
