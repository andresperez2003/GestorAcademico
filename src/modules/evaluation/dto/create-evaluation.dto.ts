import { IsDate, IsNumber, IsInt, IsNotEmpty } from 'class-validator';

export class CreateEvaluationDto {
  @IsNotEmpty()
  @IsDate()
  evaluationDate: Date;

  @IsNotEmpty()
  @IsNumber()
  grade: number;

  @IsNotEmpty()
  @IsInt()
  enrollmentId: number;

  @IsNotEmpty()
  @IsInt()
  evaluationTypeId: number;
}
