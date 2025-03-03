import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Evaluation } from './evaluation.entity';
import { Repository } from 'typeorm';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { Enrollment } from '../enrollment/enrollment.entity';
import { EvaluationType } from '../evaluation-type/evaluation-type.entity';

@Injectable()
export class EvaluationService {
      constructor(
        @InjectRepository(Evaluation)
        private readonly evaluationRepository: Repository<Evaluation>,
        @InjectRepository(Evaluation)
        private readonly enrollmentRepository: Repository<Enrollment>,
        @InjectRepository(Evaluation)
        private readonly evaluationTypeRepository: Repository<EvaluationType>,
      ) {}
    
      async create(createEvaluationDto: CreateEvaluationDto) {
        try {
          const { enrollmentId, evaluationTypeId, ...evaluationData } = createEvaluationDto;
      
          // Buscar la inscripción (enrollment)
          const enrollment = await this.enrollmentRepository.findOne({ where: { id: enrollmentId } });
          if (!enrollment) {
            throw new NotFoundException(`Enrollment with id ${enrollmentId} not found`);
          }
      
          // Buscar el tipo de evaluación (evaluationType)
          const evaluationType = await this.evaluationTypeRepository.findOne({ where: { id: evaluationTypeId } });
          if (!evaluationType) {
            throw new NotFoundException(`EvaluationType with id ${evaluationTypeId} not found`);
          }
      
          // Crear la evaluación asignando las relaciones correctamente
          const evaluation = this.evaluationRepository.create({
            ...evaluationData,
            enrollment,
            evaluationType,
          });
      
          return await this.evaluationRepository.save(evaluation);
        } catch (error) {
          throw new InternalServerErrorException('Error creating evaluation');
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


