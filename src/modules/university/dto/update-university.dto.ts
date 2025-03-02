import { IsString, Length } from 'class-validator';

export class UpdateUniversityDto {
  @IsString()
  @Length(1, 50)
  name: string;
}