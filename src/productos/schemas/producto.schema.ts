import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProductoDocument = HydratedDocument<Producto>;

@Schema({ timestamps: true })
export class Producto {
  @Prop({ type: String, required: true, unique: true, trim: true })
  nombre: string;

  @Prop({ type: Number, required: true, min: 0.01 })
  precio: number;

  @Prop({ type: Number, required: true, min: 0 })
  stock: number;

  @Prop({ type: Types.ObjectId, ref: 'Categoria', required: true })
  categoria: Types.ObjectId;

  @Prop({ type: Boolean, default: true })
  activo: boolean;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);