import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './categorias/categorias.module';
import { ProductosModule } from './productos/productos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/catalogo'),
    CategoriasModule,
    ProductosModule
  ],

})
export class AppModule {}
