import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema({id:true})
export class User {

	@Prop({unique: true})
	email: string;

	@Prop()
	passwordHash: string;
}

export const userSchema = SchemaFactory.createForClass(User);