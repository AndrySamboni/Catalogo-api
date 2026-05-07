import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria, CategoriaDocument } from './schemas/categoria.schema';
import { Producto } from '../productos/schemas/producto.schema';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel(Categoria.name) private categoriaModel: Model<CategoriaDocument>,
    @InjectModel(Producto.name) private productoModel: Model<any>,
  ) {}

  async create(dto: CreateCategoriaDto): Promise<Categoria> {
    const existe = await this.categoriaModel.findOne({ nombre: dto.nombre });
    if (existe) throw new ConflictException(`Ya existe una categoría con el nombre "${dto.nombre}"`);
    return this.categoriaModel.create(dto);
  }

  async findAll(): Promise<Categoria[]> {
    return this.categoriaModel.find().sort({ nombre: 1 });
  }

  async findOne(id: string): Promise<Categoria> {
    const cat = await this.categoriaModel.findById(id);
    if (!cat) throw new NotFoundException(`La categoría con id ${id} no existe`);
    return cat;
  }

  async update(id: string, dto: UpdateCategoriaDto): Promise<Categoria> {
    if (dto.nombre) {
      const existe = await this.categoriaModel.findOne({ nombre: dto.nombre, _id: { $ne: id } });
      if (existe) throw new ConflictException(`Ya existe una categoría con el nombre "${dto.nombre}"`);
    }
    const cat = await this.categoriaModel.findByIdAndUpdate(id, dto, { new: true });
    if (!cat) throw new NotFoundException(`La categoría con id ${id} no existe`);
    return cat;
  }

  async remove(id: string): Promise<void> {
    const cat = await this.categoriaModel.findById(id);
    if (!cat) throw new NotFoundException(`La categoría con id ${id} no existe`);
    const count = await this.productoModel.countDocuments({ categoria: id });
    if (count > 0) throw new ConflictException(`No se puede eliminar: la categoría tiene ${count} producto(s) asociado(s)`);
    await this.categoriaModel.findByIdAndDelete(id);
  }
}