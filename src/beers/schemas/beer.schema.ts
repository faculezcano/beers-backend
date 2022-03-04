import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BeerDocument = Beer & Document;

@Schema({
  strict: false,
})
export class Beer {
  @Prop({
    required: true,
  })
  name: string
}

export const BeerSchema = SchemaFactory.createForClass(Beer);