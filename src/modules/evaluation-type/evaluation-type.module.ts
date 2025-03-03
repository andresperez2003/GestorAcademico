import { Module } from '@nestjs/common';
import { EvaluationTypeController } from './evaluation-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluationType } from './evaluation-type.entity';
import { EvaluationTypeService } from './evaluation-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([EvaluationType])],
  controllers: [EvaluationTypeController],
  providers: [EvaluationTypeService],
  exports: [EvaluationTypeService], 
})
export class EvaluationTypeModule {}
