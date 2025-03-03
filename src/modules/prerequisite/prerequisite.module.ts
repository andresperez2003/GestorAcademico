// prerequisite.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prerequisite } from './prerequisite.entity';
import { PrerequisiteService } from './prerequisite.service';
import { PrerequisiteController } from './prerequisite.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Prerequisite])],
  controllers: [PrerequisiteController],
  providers: [PrerequisiteService],
  exports: [PrerequisiteService],
})
export class PrerequisiteModule {}