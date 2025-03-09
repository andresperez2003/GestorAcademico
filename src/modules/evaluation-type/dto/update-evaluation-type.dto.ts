import { IsString, IsNumber, Min, Max } from 'class-validator';

export class UpdateEvaluationTypeDto {
  @IsString()
  name: string;
}