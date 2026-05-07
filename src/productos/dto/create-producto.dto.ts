import { IsString, IsNumber, IsInt, Min, IsBoolean, IsOptional, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string | undefined;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0.01, { message: 'El precio debe ser mayor a 0' })
  precio: number | undefined;

  @IsInt({ message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock debe ser mayor o igual a 0' })
  stock: number | undefined;

  @IsMongoId({ message: 'La categoría debe ser un id válido' })
  categoria: string | undefined;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}