// dto/create-professor.dto.ts
import { IsString, IsEmail, Length } from 'class-validator';

export class CreateProfessorDto {
  @IsString()
  @Length(1, 100)
  name: string;

  @IsEmail()
  email: string;
}