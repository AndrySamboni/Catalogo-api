import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProductoDocument = HydratedDocument<Producto>;

@Schema({ timestamps: true })
export class Producto {
  @Prop({ required: true, unique: true, trim: true })
  nombre: string;

  @Prop({ required: true, min: 0.01 })
  precio: number;

  @Prop({ required: true, min: 0 })
  stock: number;

  @Prop({ type: Types.ObjectId, ref: 'Categoria', required: true })
  categoria: Types.ObjectId;

  @Prop({ default: true })
  activo: boolean;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);