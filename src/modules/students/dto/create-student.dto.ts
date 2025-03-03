import { IsString, IsDate } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  identification: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDate()
  birthDate: Date;
}
