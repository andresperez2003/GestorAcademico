// professor.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professor } from './professor.entity';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Professor])],
  controllers: [ProfessorController],
  providers: [ProfessorService],
  exports: [ProfessorService, TypeOrmModule],
})
export class ProfessorModule {}