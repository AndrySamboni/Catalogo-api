import { MaxLength, IsString, IsOptional } from 'class-validator';

export class UpdateCategoriasDto {
  @IsString()
  nombre?: string;

  @IsOptional()
  @MaxLength(300)
  @IsString()
  descripcion?: string;

}