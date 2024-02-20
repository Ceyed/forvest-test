import { Injectable } from '@nestjs/common';
import { uuid } from 'libs/src/lib/common/uuid';
import { CreateBookDto } from 'libs/src/lib/dtos/book/create-book.dto';
import { UpdateBookDto } from 'libs/src/lib/dtos/book/update-book.dto';
import { UpdateResultDto } from 'libs/src/lib/dtos/update-result.dto';
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

  update(id: uuid, updateBookDto: UpdateBookDto): Promise<UpdateResultDto> {
    return this._bookRepository.edit(id, updateBookDto);
  }
}
