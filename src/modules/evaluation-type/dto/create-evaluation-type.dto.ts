import { IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateEvaluationTypeDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  percentage: number;
}