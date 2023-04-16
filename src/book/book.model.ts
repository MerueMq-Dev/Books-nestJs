import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";

export type BookDocument = mongoose.HydratedDocument<Book>;

@Schema({
	id: true
})
export class Book {
	@Prop({required: true})
	title: string;
	
	@Prop({ required: true })
	description: string;

	
	@Prop({ required: true })
	countPages: number;

	@Prop({required: true})
	author:string;
}

export const bookSchema = SchemaFactory.createForClass(Book);