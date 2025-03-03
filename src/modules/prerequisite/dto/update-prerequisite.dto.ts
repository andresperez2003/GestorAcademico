// dto/update-prerequisite.dto.ts
import { IsNumber } from 'class-validator';

export class UpdatePrerequisiteDto {
  @IsNumber()
  courseId?: number;

  @IsNumber()
  prerequisiteId?: number;
}
