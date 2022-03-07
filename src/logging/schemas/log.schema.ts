import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogDocument = Log & Document;

@Schema({
  strict: false,
})
export class Log {
  @Prop({
    required: true,
  })
  user: string;
  data: string;
  at: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
