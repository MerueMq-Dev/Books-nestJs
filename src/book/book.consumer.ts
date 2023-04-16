import { Process, Processor } from '@nestjs/bull';
import { CreateBookDto } from './dto/create-book.dto';
import { Job } from 'bull';
import { BookService } from './book.service';

@Processor('book')
export class BookConsumer {
	constructor(private bookServeice: BookService) {
	}

	@Process()
	async addBookToDb(job: Job<CreateBookDto>) {
		const createdBook = await this.bookServeice.create(job.data);
		return createdBook;
	}
}