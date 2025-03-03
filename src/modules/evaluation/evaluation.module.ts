import { Module } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluation } from './evaluation.entity';
import { EvaluationController } from './evaluation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluation])], // ✅ Importa el repositorio
  controllers: [EvaluationController],
  providers: [EvaluationService],
  exports: [EvaluationService, TypeOrmModule], // ✅ Exporta EvaluationRepository
})
export class EvaluationModule {}
