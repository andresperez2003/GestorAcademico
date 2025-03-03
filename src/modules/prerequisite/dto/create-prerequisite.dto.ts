// dto/create-prerequisite.dto.ts
import { IsNumber } from 'class-validator';

export class CreatePrerequisiteDto {
  @IsNumber()
  courseId: number;

  @IsNumber()
  prerequisiteId: number;
}