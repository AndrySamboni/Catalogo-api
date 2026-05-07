import { Controller, Get, Post, Patch, Delete, Param, Body, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categorias.dto';
import { UpdateCategoriaDto } from './dto/update-categorias.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  private validarId(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException(`El id "${id}" no es un ObjectId válido`);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateCategoriaDto) {
    return this.categoriasService.create(dto);
  }

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.validarId(id);
    return this.categoriasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoriaDto) {
    this.validarId(id);
    return this.categoriasService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.validarId(id);
    return this.categoriasService.remove(id);
  }
}