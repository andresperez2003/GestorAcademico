// dto/update-professor.dto.ts
import { IsString, IsEmail, Length, IsNumber } from 'class-validator';
import { PrimaryColumn } from 'typeorm';

export class UpdateProfessorDto {
  @PrimaryColumn({ length: 20 })
  @IsString()
  identification?: string;

  @IsString()
  @Length(1, 100)
  firstName?: string;

  @IsString()
  @Length(1, 100)
  lastName?: string;

  @IsNumber()
  departmentId?: number;

}
