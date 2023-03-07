import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Orders>;

@Schema()
export class Orders {
  @Prop()
  email: string;

  @Prop()
  currencyFrom: string;

  @Prop()
  currencyTo: string;

  @Prop()
  valueFrom: number;

  @Prop()
  valueTo: number;

  @Prop()
  comment: string;
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);
