import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

  @IsString()
  @IsNotEmpty()
  dayOfWeek: string;

  @IsInt()
  @IsNotEmpty()
  courseId: number;
}