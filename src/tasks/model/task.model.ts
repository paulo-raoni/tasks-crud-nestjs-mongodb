import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ValidStatus } from '../enum/validStatus';

@Schema({
  validateBeforeSave: true,
})
export class Task extends mongoose.Document {
  id: string;
  @Prop({
    required: [true, 'title is required'],
  })
  title: string;

  @Prop({
    required: [true, 'description is required'],
  })
  description: string;

  @Prop({
    type: String,
    required: [true, 'status is required'],
    enum: Object.values(ValidStatus),
  })
  status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
