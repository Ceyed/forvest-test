import { Injectable } from '@nestjs/common';
import { CreateBookDto } from 'libs/src/lib/dtos/book/create-book.dto';
import { BookEntity } from 'libs/src/lib/entities/book/book.entity';
import { BookRepository } from 'libs/src/lib/entities/book/book.repository';

@Injectable()
export class BookService {
  constructor(private readonly _bookRepository: BookRepository) {}

  getAll(): Promise<BookEntity[]> {
    return this._bookRepository.getAll();
  }

  create(createBookDto: CreateBookDto): Promise<BookEntity> {
    return this._bookRepository.add(createBookDto);
  }
}
