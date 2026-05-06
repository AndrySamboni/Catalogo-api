import {injectable} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Categoria, CategoriaDocument } from './schemas/categoria.schema'
import { CreateCategoriaDto } from './dto/create-categoria.dto'
import { UpdateCategoriaDto } from './dto/update-categoria.dto'

@injectable()
export class CategoriasService {
  constructor(
    @InjectModel(Categoria.name) 
    private readonly categoriaModel: Model<CategoriaDocument>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const createdCategoria = new this.categoriaModel(createCategoriaDto);
    return createdCategoria.save();
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria | null> {
    return this.categoriaModel.findByIdAndUpdate(id, updateCategoriaDto, { new: true });
  }

  async delete(id: string): Promise<Categoria | null> {
    return this.categoriaModel.findByIdAndDelete(id);
  }

    async findAll(): Promise<Categoria[]> {
      return await this.categoriaModel.find();
    }

    async findOne(id: string): Promise<Categoria | null> {
        return await this.categoriaModel.findById(id);
    }
}