import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ProductoService } from "./productos.service";
import { CreateProductosDto } from "./dto/create-productos.dto";
import { UpdateProductosDto } from "./dto/update-productos.dto";

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductoService) {}

  @Post()
  async create(@Body() createProductosDto: CreateProductosDto) {
    return await this.productosService.create(createProductosDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductosDto: UpdateProductosDto) {
    return await this.productosService.update(id, updateProductosDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.productosService.delete(id);
  }

  @Get()
  async findAll() {
    return await this.productosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productosService.findOne(id);
  }
}

