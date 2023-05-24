import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  photo: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: Number, required: true })
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
