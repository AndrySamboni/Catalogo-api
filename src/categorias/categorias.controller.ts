import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

    @Post() 
    async create(@Body() createCategoriaDto: CreateCategoriaDto) {
        return await this.categoriasService.create(createCategoriaDto);
    }

    @Put(':id') 
    async update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
        return await this.categoriasService.update(id, updateCategoriaDto);
    }

    @Delete(':id')  
    async delete(@Param('id') id: string) {
        return await this.categoriasService.delete(id);
    }

    @Get() 
    async findAll() {
        return await this.categoriasService.findAll();
    }   

    @Get(':id') 
    async findOne(@Param('id') id: string) {
        return await this.categoriasService.findOne(id);    
    }
}