// dto/create-course.dto.ts
import { IsString, Length, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @Length(1, 100)
  name: string;

  @IsString()
  @Length(1, 255)
  description: string;

  @IsOptional()
  professorId?: string;
}
