import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateCategoriaDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'La descripción no puede superar 200 caracteres' })
  descripcion?: string;
}