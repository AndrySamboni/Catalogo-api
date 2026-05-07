import { IsString, IsNumber, IsInt, Min, IsBoolean, IsOptional, IsMongoId } from 'class-validator';

export class UpdateProductoDto {
  @IsOptional() @IsString()
  nombre?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0.01, { message: 'El precio debe ser mayor a 0' })
  precio?: number;

  @IsOptional()
  @IsInt({ message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock debe ser mayor o igual a 0' })
  stock?: number;

  @IsOptional()
  @IsMongoId({ message: 'La categoría debe ser un id válido' })
  categoria?: string;

  @IsOptional() @IsBoolean()
  activo?: boolean;
}