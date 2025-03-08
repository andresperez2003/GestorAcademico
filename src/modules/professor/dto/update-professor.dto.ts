import { IsString, IsEmail, Length, IsNumber, IsOptional } from 'class-validator';

export class UpdateProfessorDto {
  @IsOptional()
  @IsString()
  identification?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  lastName?: string;

  @IsOptional()
  @IsNumber({}, { message: "departmentId debe ser un número válido" })
  departmentId?: number;
}
