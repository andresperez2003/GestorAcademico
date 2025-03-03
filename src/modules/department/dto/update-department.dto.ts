import { IsNumber, IsString, Length } from 'class-validator';

export class UpdateDepartmentDto {
  @IsString()
  @Length(1, 50)
  name: string;

  @IsNumber()
  universityId: number;
}