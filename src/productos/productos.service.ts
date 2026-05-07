import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto, ProductoDocument } from './schemas/producto.schema';
import { Categoria, CategoriaDocument } from '../categorias/schemas/categoria.schema';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel(Producto.name) private productoModel: Model<ProductoDocument>,
    @InjectModel(Categoria.name) private categoriaModel: Model<CategoriaDocument>,
  ) {}

  async create(dto: CreateProductoDto): Promise<Producto> {
    const cat = await this.categoriaModel.findById(dto.categoria);
    if (!cat) throw new NotFoundException(`La categoría con id ${dto.categoria} no existe`);
    const existe = await this.productoModel.findOne({ nombre: dto.nombre });
    if (existe) throw new ConflictException(`Ya existe un producto con el nombre "${dto.nombre}"`);
    return this.productoModel.create(dto);
  }

  async findAll(incluirInactivos: boolean, categoriaId?: string): Promise<Producto[]> {
    const filtro: any = {};
    if (!incluirInactivos) filtro.activo = true;
    if (categoriaId) filtro.categoria = categoriaId;
    return this.productoModel.find(filtro).populate('categoria', 'nombre').sort({ nombre: 1 });
  }

  async findOne(id: string): Promise<Producto> {
    const prod = await this.productoModel.findById(id).populate('categoria');
    if (!prod) throw new NotFoundException(`El producto con id ${id} no existe`);
    return prod;
  }

  async update(id: string, dto: UpdateProductoDto): Promise<Producto> {
    if (dto.categoria) {
      const cat = await this.categoriaModel.findById(dto.categoria);
      if (!cat) throw new NotFoundException(`La categoría con id ${dto.categoria} no existe`);
    }
    if (dto.nombre) {
      const existe = await this.productoModel.findOne({ nombre: dto.nombre, _id: { $ne: id } });
      if (existe) throw new ConflictException(`Ya existe un producto con el nombre "${dto.nombre}"`);
    }
    const prod = await this.productoModel.findByIdAndUpdate(id, dto, { new: true });
    if (!prod) throw new NotFoundException(`El producto con id ${id} no existe`);
    return prod;
  }

  async desactivar(id: string): Promise<Producto> {
    const prod = await this.productoModel.findByIdAndUpdate(id, { activo: false }, { new: true });
    if (!prod) throw new NotFoundException(`El producto con id ${id} no existe`);
    return prod;
  }

  async remove(id: string): Promise<void> {
    const prod = await this.productoModel.findByIdAndDelete(id);
    if (!prod) throw new NotFoundException(`El producto con id ${id} no existe`);
  }
}