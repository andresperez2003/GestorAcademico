import { Module } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluation } from './evaluation.entity';
import { EvaluationController } from './evaluation.controller';
import { Enrollment } from '../enrollment/enrollment.entity';
import { EvaluationType } from '../evaluation-type/evaluation-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Evaluation,
      Enrollment,
      EvaluationType
    ])
  ],
  controllers: [EvaluationController],
  providers: [EvaluationService],
  exports: [EvaluationService, TypeOrmModule],
})
export class EvaluationModule {}
