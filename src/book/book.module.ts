import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BullModule } from '@nestjs/bull';

import { BookConsumer } from './book.consumer';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, bookSchema } from './book.model';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'book' }),
    MongooseModule.forFeature([{ name: Book.name, schema: bookSchema }])
  ],
  controllers: [BookController],
  providers: [BookService, BookConsumer]
})
export class BookModule { }
