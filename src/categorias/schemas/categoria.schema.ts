import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoriaDocument = HydratedDocument<Categoria>;

@Schema({ timestamps: true })
export class Categoria {
  @Prop({ type: String, required: true, unique: true, trim: true })
  nombre: string;

  @Prop({ type: String, maxlength: 200, trim: true })
  descripcion?: string;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);