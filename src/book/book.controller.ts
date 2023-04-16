import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { BookService } from './book.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('book')
export class BookController {
	constructor(@InjectQueue('book') private bookQueue: Queue<CreateBookDto>,
		private bookSevice: BookService) {
	}

	@UseGuards(JwtGuard)
	@UsePipes(new ValidationPipe({ transform: true }))
	@Post()
	async create(@Body() dto: CreateBookDto) {
		const job = await this.bookQueue.add(dto);
		const data = await job.finished();
		return data
	}

	@Get()
	async get() {
		return this.bookSevice.findAll();
	}
}
