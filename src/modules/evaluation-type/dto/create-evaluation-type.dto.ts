import { IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateEvaluationTypeDto {
  @IsString()
  name: string;
}