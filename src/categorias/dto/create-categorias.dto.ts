import { IsString, IsOptional, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string | undefined;

  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'La descripción no puede superar 200 caracteres' })
  descripcion?: string;
}