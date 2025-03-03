import { IsString, IsOptional } from 'class-validator';

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString() // Asegura que professorId sea opcional y de tipo string
  professorId?: string;
}
