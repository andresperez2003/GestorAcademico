
import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateEnrollmentDto {
  @IsNotEmpty()
  @IsDate()
  enrollmentDate: Date;

  @IsNotEmpty()
  @IsInt()
  studentId: number;

  @IsNotEmpty()
  @IsInt()
  courseId: number;
}
