// dto/update-professor.dto.ts
import { IsString, IsEmail, Length } from 'class-validator';

export class UpdateProfessorDto {
  @IsString()
  @Length(1, 100)
  name?: string;

  @IsEmail()
  email?: string;
}
