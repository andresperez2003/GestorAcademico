// src/modules/schedule/dto/update-schedule.dto.ts
import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateScheduleDto {
  @IsString()
  @IsOptional()
  startTime?: string;

  @IsString()
  @IsOptional()
  endTime?: string;

  @IsString()
  @IsOptional()
  dayOfWeek?: string;

  @IsInt()
  @IsOptional()
  courseId?: number;
}