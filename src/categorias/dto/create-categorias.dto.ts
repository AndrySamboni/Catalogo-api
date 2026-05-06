import { MaxLength, IsString, IsOptional } from "class-validator";

export class CreateCategoriasDto {
  @IsString()
  nombre: string | undefined;
  
  @IsOptional()
  @MaxLength(300)
  @IsString()
  descripcion: string | undefined;

}