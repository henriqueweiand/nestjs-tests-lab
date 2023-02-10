import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Articles>;

@Schema()
export class Articles {
  @Prop()
  title: string;

  @Prop()
  content: string;
}

export const ArticlesSchema = SchemaFactory.createForClass(Articles);
