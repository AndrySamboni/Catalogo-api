import { Controller, Get, Post, Patch, Delete, Param, Body, Query, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  private validarId(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException(`El id "${id}" no es un ObjectId válido`);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateProductoDto) {
    return this.productosService.create(dto);
  }

  @Get()
  findAll(
    @Query('incluirInactivos') incluirInactivos: string,
    @Query('categoria') categoria: string,
  ) {
    return this.productosService.findAll(incluirInactivos === 'true', categoria);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.validarId(id);
    return this.productosService.findOne(id);
  }

  @Patch(':id/desactivar')
  desactivar(@Param('id') id: string) {
    this.validarId(id);
    return this.productosService.desactivar(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductoDto) {
    this.validarId(id);
    return this.productosService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.validarId(id);
    return this.productosService.remove(id);
  }
}