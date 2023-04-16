import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './book.model';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
	constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

	async create(dto: CreateBookDto) {	
		const createdBook =  new this.bookModel(dto);
		return createdBook.save();
	}

	async findAll() {
		return this.bookModel.find().exec();
	}
}
