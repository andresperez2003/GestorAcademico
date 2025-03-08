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
        @InjectRepository(Enrollment)
        private readonly enrollmentRepository: Repository<Enrollment>,
        @InjectRepository(EvaluationType)
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
          throw new InternalServerErrorException('Error creating evaluation'+ error);
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
          const evaluation = await this.evaluationRepository.findOne({ 
            where: { id },
            relations: ['enrollment', 'evaluationType']
          });
          
          if (!evaluation) {  
            throw new NotFoundException(`Evaluation with id ${id} not found`);
          }

          // Si se proporciona un nuevo enrollmentId, buscar el enrollment
          if (updateEvaluationDto.enrollmentId) {
            const enrollment = await this.enrollmentRepository.findOne({ 
              where: { id: updateEvaluationDto.enrollmentId } 
            });
            if (!enrollment) {
              throw new NotFoundException(`Enrollment with id ${updateEvaluationDto.enrollmentId} not found`);
            }
            evaluation.enrollment = enrollment;
          }

          // Si se proporciona un nuevo evaluationTypeId, buscar el evaluationType
          if (updateEvaluationDto.evaluationTypeId) {
            const evaluationType = await this.evaluationTypeRepository.findOne({ 
              where: { id: updateEvaluationDto.evaluationTypeId } 
            });
            if (!evaluationType) {
              throw new NotFoundException(`EvaluationType with id ${updateEvaluationDto.evaluationTypeId} not found`);
            }
            evaluation.evaluationType = evaluationType;
          }

          // Actualizar los demás campos
          Object.assign(evaluation, updateEvaluationDto);
          
          // Guardar los cambios
          const updatedEvaluation = await this.evaluationRepository.save(evaluation);
          return updatedEvaluation;
        } catch (error) {
          if (error instanceof NotFoundException) {
            throw error;
          }
          throw new InternalServerErrorException('Error updating evaluation');
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


