import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProductoDocument = HydratedDocument<Producto>;

@Schema({ timestamps: true })
export class Producto {
  @Prop({ required: true, unique: true, trim: true })
  nombre: string | undefined;

  @Prop({ required: true, min: 0.01 })
  precio: number | undefined;

  @Prop({ required: true, min: 0 })
  stock: number | undefined;

  @Prop({ type: Types.ObjectId, ref: 'Categoria', required: true })
  categoria: Types.ObjectId | undefined;

  @Prop({ default: true })
  activo: boolean | undefined;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);