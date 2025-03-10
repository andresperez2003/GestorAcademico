import { IsString, Length, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProfessorDto {
  @IsString()
  @IsOptional()
  identification: string;

  @IsString()
  @Length(1, 100)
  @IsNotEmpty({ message: "El campo firstName es obligatorio" })
  firstName: string;

  @IsString()
  @Length(1, 100)
  @IsNotEmpty({ message: "El campo lastName es obligatorio" })
  lastName: string;

  @IsOptional()
  @IsNumber({}, { message: "departmentId debe ser un número válido" })
  departmentId?: number;
}
