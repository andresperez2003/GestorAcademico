// dto/create-university.dto.ts
import { IsString, Length } from 'class-validator';

export class CreateUniversityDto {
  @IsString()
  @Length(1, 50)
  name: string;
}