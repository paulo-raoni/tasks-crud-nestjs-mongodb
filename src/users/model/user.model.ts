import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';

@Schema({validateBeforeSave: true})

export class User {
  @Transform(({ value }) => value.toString())
  _id: string;
 
  @Prop({ type: String, required: true, unique: true })
  name: string;
 
  @Prop({ type: String, required: true })
  @Exclude()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);