import { IsString, IsDate } from 'class-validator';

export class UpdateStudentDto {
  @IsString()
  identification: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDate()
  birthDate: Date;
}
