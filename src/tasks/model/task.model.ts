import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { ValidStatus } from '../enum/validStatus';
import { User } from '../../users/model/user.model';
import { Transform } from 'class-transformer';

@Schema({
  validateBeforeSave: true,
})
export class Task extends Document {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

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

  @Prop({ type: Types.ObjectId, ref: User.name, required: [true, 'userId is required'] })
  userId: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
