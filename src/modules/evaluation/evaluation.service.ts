import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Evaluation } from './evaluation.entity';
import { Repository } from 'typeorm';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';

@Injectable()
export class EvaluationService {
      constructor(
        @InjectRepository(Evaluation)
        private readonly evaluationRepository: Repository<Evaluation>,
      ) {}
    
      async create(createEvaluationDto: CreateEvaluationDto) {
          try {
            const enrollment = this.evaluationRepository.create(createEvaluationDto);
            return await this.evaluationRepository.save(enrollment);
          } catch (error) {
            return new InternalServerErrorException('Error creating evaluation');
          }
      }
    
      async findAll() {
        return await this.evaluationRepository.find({
          relations: ['enrollment', 'evaluationType'], // Asegura que las relaciones se carguen
        });
      }
    
      async findOne(id: number) {
        const evaluation = await this.evaluationRepository.findOne({
          where: { id },
          relations: ['enrollment', 'evaluationType'], // Cargar relaciones
        });
        if (!evaluation) {
            return new NotFoundException(`Evaluation with id ${id} not found`);
        }
        return evaluation;
      }
    
      async update(id: number, updateEvaluationDto: UpdateEvaluationDto) {
        try {
          const enrollment = await this.evaluationRepository.findOne({ where: { id } });
          if (!enrollment) {
              return new NotFoundException(`Evaluation with id ${id} not found`);
          }
          await this.evaluationRepository.update(id, updateEvaluationDto);
          return this.findOne(id);
        } catch (error) {
            return new InternalServerErrorException('Error updating evaluation');
        }
      }
        
      async remove(id: number) {
        const evaluation = await this.evaluationRepository.findOne({ where: { id } });
        if (!evaluation) {
            return new NotFoundException(`Evaluation with id ${id} not found`);
        }
        await this.evaluationRepository.delete(id);
        return { message: 'Evaluation deleted successfully' };
      }
}


