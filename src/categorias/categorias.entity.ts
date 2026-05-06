import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose' 

@Schema()
export class Categoria extends Document {
  @Prop({ required: true })
  name: string;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);