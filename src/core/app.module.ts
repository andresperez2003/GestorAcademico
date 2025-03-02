import { Module } from '@nestjs/common';
import { UniversityController } from '../modules/university/university.controller';
import { UniversityModule } from '../modules/university/university.module';
import { DepartmentsController } from '../modules/departments/departments.controller';
import { DepartmentsService } from '../modules/departments/departments.service';
import { DepartmentsModule } from '../modules/departments/departments.module';

@Module({
  imports: [UniversityModule, DepartmentsModule],
  controllers: [UniversityController, DepartmentsController],
  providers: [DepartmentsService],
})
export class AppModule {}
