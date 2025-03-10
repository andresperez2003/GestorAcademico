import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreateStudentDto {
  @IsOptional()
  @IsString()
  identification?: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDate()
  birthDate: Date;
}
