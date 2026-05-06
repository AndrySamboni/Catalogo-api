import {Module} from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CategoriasController } from './categorias.controller'
import { CategoriasService } from './categorias.service'
import { Categoria, CategoriaSchema } from './categorias.entity'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Categoria.name, schema: CategoriaSchema }]),
  ],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})

export class CategoriasModule {}