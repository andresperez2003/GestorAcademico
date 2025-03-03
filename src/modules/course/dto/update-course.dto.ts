// dto/update-course.dto.ts
import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateCourseDto {
  @IsString()
  @Length(1, 100)
  @IsOptional()
  name?: string;

  @IsString()
  @Length(1, 255)
  @IsOptional()
  description?: string;

  @IsOptional()
  professorId?: number;
}